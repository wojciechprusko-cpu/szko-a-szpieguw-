import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-loaded GenAI helper
let aiClient: any = null;
function getGeminiClient() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("GEMINI_API_KEY environment variable is missing.");
      return null;
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Custom agent system instruction
const SYSTEM_INSTRUCTION = `
Jesteś elitarnym "Sztucznym Asystentem Wywiadu CIA" (system kodowy: ORION), przypisanym do archiwum wiedzy o Akademii Szpiegostwa (seria książek "Szkoła szpiegów" autorstwa Stuarta Gibbsa).
Twoim celem jest odpowiadanie na wszelkie pytania dotyczące fabuły, postaci, organizacji oraz szczegółów wszystkich części książek.
Znasz na wylot przygody Benjamina Ripleya (Bena), Eriki Hale, incompetentnego Alexandra Hale'a, legendarnego Cyrusa Hale'a, Mike'a, Zoe, Jawy, Chipa oraz przebiegłego Murraya Hilla i złowrogiej organizacji SPYDER (P.A.Y.E.C.).

Wytyczne dotyczące Twojego zachowania i stylu odpowiedzi:
1. Odpowiadaj zawsze w języku polskim.
2. Zachowaj tajny, szpiegowski ton raportu wywiadowczego. Czasem możesz wtrącić kwestie typu "Dostęp autoryzowany", "Ściśle tajne", "Raport taktyczny:".
3. Bądź niezwykle lojalny wobec Bena i Eriki. Traktuj Alexandra Hale'a z delikatną ironią, wiedząc, że jest pozorantem przypisującym sobie cudze zasługi.
4. Twoja wiedza obejmuje tomy od 1 do 10, w tym:
   - Tom 1: Szkoła szpiegów (Spy School) - werbunek Bena, intryga z kretem, ocalenie akademii.
   - Tom 2: Szkoła szpiegów na wakacjach (Spy Camp) - obóz przetrwania w Maine, zakusy SPYDER-a na zrekrutowanie Bena.
   - Tom 3: Szkoła szpiegów w chmurach (Evil Spy School) - Ben jako podwójny agent w złowrogiej szkole SPYDER-a.
   - Tom 4: Szkoła szpiegów na nartach (Spy School Ski Spree) - misja w Aspen, kurort narciarski, śledzenie Leo Shanga.
   - Tom 5: Szkoła szpiegów w tajnej służbie (Spy School Secret Service) - spisek na życie prezydenta, Ben wrobiony i uciekający przed służbami.
   - Tom 6: Szkoła szpiegów idzie na wojnę (Spy School Goes South) - misja w Antarktyce, poszukiwanie bazy SPYDER-a.
   - Tom 7: Szkoła szpiegów w puszczy (Spy School British Invasion / Spy School in the Wild) - misja w Wielkiej Brytanii i Europie, powstrzymanie kluczowego ataku SPYDER-a.
   - Tom 8: Szkoła szpiegów. Wyprawa do lasu (Spy School Revolution) - Erica rzekomo zdradza CIA, poszukiwanie prawdy przez Bena.
   - Tom 9: Szkoła szpiegów. Na dnie morza (Spy School at Sea) - śledztwo na luksusowym statku wycieczkowym.
   - Tom 10: Szkoła szpiegów w kosmosie (Spy School Project X) - walka z nowoczesnymi zagrożeniami technologicznymi i polowanie na nagrodę za głowę Bena.
5. Jeżeli użytkownik zapyta o pytania wykraczające poza cykl książek "Szkoła szpiegów", grzecznie sprowadź go z powrotem na szpiegowski tor, przypominając, że jako system CIA masz zakaz ujawniania innych danych.
6. Odpowiadaj zwięźle, konkretnie i z pasją godną najlepszego agenta operacyjnego.
`;

// API routes
app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Nieprawidłowy format wiadomości. Oczekiwano tablicy 'messages'." });
    }

    const client = getGeminiClient();
    if (!client) {
      // Return a simulated high-quality Spy School AI answer if API KEY is not set
      const lastUserMsg = messages[messages.length - 1]?.content || "";
      const lowerMsg = lastUserMsg.toLowerCase();
      
      let answer = "Dostęp Autoryzowany. Meldunek techniczny: System działa w trybie awaryjnym offline (brak klucza API). ";
      if (lowerMsg.includes("ben") || lowerMsg.includes("ripley")) {
        answer += "Benjamin Ripley to nasz najzdolniejszy matematyczny kryptolog, choć jego sprawność fizyczna wciąż pozostawia wiele do życzenia. Według akt, jego przetrwanie zależy głównie od szczęścia oraz niesamowitej zdolności liczenia trajektorii w pamięci.";
      } else if (lowerMsg.includes("eric") || lowerMsg.includes("hale")) {
        answer += "Erica Hale to legenda akademii. Opanowała sztuki walki, infiltrację i łamanie kodów na poziomie przewyższającym większość dorosłych agentów CIA. Choć wydaje się chłodna, zawsze ratuje tyłek Benowi.";
      } else if (lowerMsg.includes("murray") || lowerMsg.includes("hill")) {
        answer += "Murray Hill to dezerter i kret. Nienawidzi pracy fizycznej i porannych apelów. Wielokrotnie kolaborował ze SPYDER-em (P.A.Y.E.C.) tylko po to, by mieć święty spokój i grać na konsoli.";
      } else if (lowerMsg.includes("spyder") || lowerMsg.includes("payec")) {
        answer += "SPYDER (P.A.Y.E.C.) to tajna syndykat zbrodni, który wielokrotnie próbował zniszczyć akademię, a nawet przejąć kontrolę nad światem. Ben Ripley oparł się ich próbom rekrutacji w obozie przetrwania i w ich własnej 'Evil Spy School'.";
      } else {
        answer += "Witaj, Kadecie. Jestem systemem ORION. Zapytaj mnie o fabułę książek, bohaterów lub szczegóły misji. Możesz również sprawdzić gotowe streszczenia w zakładkach bazy wiedzy obok!";
      }
      return res.json({ text: answer });
    }

    // Format chat history for @google/genai SDK
    // The SDK expects contents in structural format.
    // Let's use the simple chat approach.
    const lastUserMessage = messages[messages.length - 1];
    
    // Construct instructions and chat context
    const contents = messages.map((m: any) => {
      return {
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: m.content || "" }]
      };
    });

    const response = await client.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Błąd podczas komunikacji z Gemini API:", error);
    res.status(500).json({ error: "Błąd serwera podczas generowania odpowiedzi: " + error.message });
  }
});

// Setup Vite or static serving based on environment
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Serwer Szkoły Szpiegów uruchomiony na porcie ${PORT}`);
  });
}

startServer();
