# context-meter: zapełnienie okna kontekstu nad promptem

Mod do Claude Code, który pokazuje nad polem promptu, ile kontekstu jest już zajęte:

```
Kontekst █████░░░░░░░░░░░░░░░ 25% (50k / 200k)
```

- Pasek ma 20 kratek: zielony do 59%, żółty od 60%, czerwony od 85%.
- Pojawia się po pierwszej odpowiedzi modelu i odświeża się sam po każdej kolejnej.
- Chowa się, gdy Claude Code wyświetla ankietę.

Pomysł pochodzi z filmu [Claude Mods Is The Biggest Claude Code Upgrade Since Skills](https://youtu.be/Rn4nmFRPe0s) (Chase AI). Mody to wtyczki Claude Code, które mogą dodawać panele, paski nad promptem, wpisy w pasku statusu i powiadomienia.

## Instalacja

Mody działają w Claude Code (terminal albo zakładka Code w Claude Desktop). Nie działają w zwykłym czacie.

1. Pobierz repo:
   ```
   git clone https://github.com/Przepiores/Notch-for-win-11.git
   ```
2. Uruchom Claude Code z folderem moda:
   ```
   claude --plugin-dir C:\ścieżka\do\Notch-for-win-11\mods\context-meter
   ```
3. Napisz cokolwiek do Claude. Po pierwszej odpowiedzi pasek pojawi się nad promptem.

Sprawdzenie i testy:
```
claude plugin validate mods/context-meter
claude plugin test mods/context-meter
```

Bez moda możesz w każdej chwili wpisać `/context`, żeby zobaczyć podział zajętego kontekstu na kategorie.

## Pliki

| Plik | Co robi |
| --- | --- |
| `.claude-plugin/plugin.json` | Manifest: nazwa, wersja, opis, ścieżka do typów |
| `hooks/hooks.json` | Wskazuje moduł z hookami |
| `hooks/register.tsx` | Hook `session.measure` zapisuje zapełnienie kontekstu, hook `ui.render` na `AbovePrompt` rysuje pasek |
| `hooks/meter.ts` | Rysowanie paska, kolor według progu, skracanie liczb do „k” |
| `hooks/register.test.ts` | Testy paska, kolorów i formatowania |
| `types/index.d.ts` | Kontrakt stanu `context-meter.fill` |

## Możliwe rozszerzenia

- Przycisk „Ukryj” na pasku.
- Powiadomienie (toast), gdy kontekst przekroczy 85%.
- Automatyczne `$.session.compact()` przy wysokim zapełnieniu.
