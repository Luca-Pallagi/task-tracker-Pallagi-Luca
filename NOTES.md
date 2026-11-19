# Notizen

> Fülle diese Datei während der Arbeit aus. Kurz und ehrlich ist besser als lang und poliert.

**Gewähltes Backend:** Node.js / Python _(eines löschen)_

## Bugs

| #   | Symptom                                    | Ursache | Fix (Dateien / was geändert) |
| --- | ------------------------------------------ | ------- | ---------------------------- |
| 1   | Die Tasklist ist leehr, obwohl die Datenbank Tasks enthält                                           |  Fehlendes Await beim Asynchronen Aufruf       |   tasks.js / await beim Aufruf von taskService hinzugefügt                |
| 2   |Die Tasks in der Taskliste wurden nicht nach der Priorität sortiert                                            |Priorität war String anstatt Number         |models/task.js / String zu Number abgeändert                              |
| 3   | Beim erstellen eines Tasks wurde der Tag war Datum einen Tag vor dem angegebenen Datum                                           |kombination von setDate() und toISOString         | TaskForm.jsx / dueDate im Frontend als String gespeichert                             |
| 4   | Beim abhacken einer Task, ist er erst beim Neuladen der Seite abgehackt.                                           |Tasklist wurde nicht aktualisiert          | App.jsx / loadTask bei HandleToggle eingefügt.                             |
| 5   |                                            |         |                              |
| 6   | Beim ändern eines Tasks über das Partnersystem, ist das Fälligkeitsdatum verschwunden.                                           |fehlende überprüfung ob dueDate verändert werden soll         |                              |taskService.js / if statement hinzugefügt, um zu überprüfen ob dueDate geändert werden soll.
| …   | _(alles, was du sonst noch gefunden hast)_ |         |                              |

## Feature: Filtern und Sortieren

_Wie hast du es umgesetzt? Welche Entscheidungen hast du getroffen, und warum?_

## Tests

_Welche Tests hast du geschrieben, und was decken sie ab?_

## KI-Nutzung

- **Verwendete Tools:** Claude und ChatGPT
- **Wofür ich sie verwendet habe:** 
Beim Erklären einiger Zeilen im Code.

Beim Suchen und erklären des 3. Bugs.
- **Wo die KI falsch lag oder nicht geholfen hat, und wie ich es gemerkt habe:**

## Zeitaufwand

| Aufgabe   | Zeit |
| --------- | ---- |
| Setup     | 15min|
| Bugs      | 3h   |
| Feature   |      |
| Tests     |      |
| NOTES.md  |      |
| **Total** |      |

## Offene Punkte / was ich mit mehr Zeit machen würde
