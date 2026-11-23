# Notizen

**Gewähltes Backend:** Node.js

## Bugs

| #   | Symptom                                    | Ursache | Fix (Dateien / was geändert) |
| --- | ------------------------------------------ | ------- | ---------------------------- |
| 1   | Die Tasklist ist leer, obwohl die Datenbank Tasks enthält                                           |  Fehlendes Await beim Asynchronen Aufruf       |   tasks.js / await beim Aufruf von taskService hinzugefügt                |
| 2   |Die Tasks in der Taskliste wurden nicht nach der Priorität sortiert                                            |Priorität war String anstatt Number         |models/task.js / String zu Number abgeändert                              |
| 3   | Beim erstellen eines Tasks wurde der Tag des Datums, einen Tag vor dem angegebenen Datum angezeigt                                          |kombination von setDate() und toISOString         | TaskForm.jsx / dueDate im Frontend als String gespeichert                             |
| 4   | Beim abhacken einer Task, ist er erst beim Neuladen der Seite abgehackt.                                           |Tasklist wurde nicht aktualisiert          | App.jsx / loadTask bei HandleToggle eingefügt.                             |
| 5   | Beim Aufruf von `GET /api/tasks/123` wird der HTTP-500 Fehler angezeigt anstatt den 400 Fehler                                           | Die Id ist keine Mongoose Id        |  taskService / ein if eingefügt das überprüft ob es eine mongoose Id ist.                            | 
| 6   | Beim ändern einer Task über das Partnersystem, ist das Fälligkeitsdatum verschwunden.                                           | fehlende überprüfung ob dueDate verändert werden soll         |  taskService.js / if statement hinzugefügt, um zu überprüfen ob dueDate geändert werden soll.                             |                            |

## Feature: Filtern und Sortieren

_Wie hast du es umgesetzt? Welche Entscheidungen hast du getroffen, und warum?_

Zuerst habe ich im Backend sort und order eingefügt. Danach in App.jsx die Dropdowns hinzugeügt, damit keine falsche Werte eingegeben werden können, und in api.js sort und order als request query erstellt. Am Ende sortierte die Liste nicht und ich fragte die KI, weil ich den Fehler lange nicht fand, was nicht stimmte war, dass im route/tasks noch die req.query fiehlen.

Für den Status und die minPriority habe ich zuerst, im taskService zwei If Statements erstellt die testen, ob Status ud minPriority die korrekten Werte haben. Anbei habe ich im taskService zuerst einen leeren filtern erstellt, der den Status und die Priorität speichert. Somit musste ich am schluss nur noch die Task.find()  zu Task.find(filter) abändern.

In der api.js erstellte ich eine Variabel für die url. Damit ich, falls es status oder minPriority hat, diese einfach zur URL hinzufügen kann.

Im Frontend erstellte ich zwei neue UseStates für minPriority und status. Am Schluss erstellte ich nochmals zwei neue Dropdowns, welche die minPriority und status anzeigen. Die minPriority erstellte ich mit map, damit ich nicht jede einzelne option schreiben muss.

## Tests

_Welche Tests hast du geschrieben, und was decken sie ab?_

Den fünften Bug. Er testet ob die Request die 400 Http request ist, falls die Id keine Mongoose Id ist.

Den ersten Bug. Er erstellt eine Task und überprüft ob der Task erstellt wurde und in den tasks aufgelistet ist.

Den dritten Bug. Es erstellt eine neue Task mit einen vorgegebenen Datum und überprüft den body.dueDate, ob er noch dashelbe datum hat wie beim erstellen.

## KI-Nutzung

- **Verwendete Tools:** Claude und ChatGPT
- **Wofür ich sie verwendet habe:** 
Beim Erklären einiger Zeilen im Code.

Beim Suchen und erklären des 3. Bugs.

Beim Bug 5 vom finden der moongose Bibliothek und `.isValidObjectId()` funktion.

Für das .include für den HttpError von sort und order.

Bei Task.find(filter).sort ...  hat es mir gezeigt wie es mit filter einfach funktioniert.

- **Wo die KI falsch lag oder nicht geholfen hat, und wie ich es gemerkt habe:**

## Zeitaufwand

| Aufgabe   | Zeit |
| --------- | ---- |
| Setup     | 15min|
| Bugs      | 3h   |
| Feature   | 2h   |
| Tests     | 1h   |
| NOTES.md  | 20min|
| **Total** | 6h 35min|

## Offene Punkte / was ich mit mehr Zeit machen würde
- Frontend verbessern: Die Dropdowns für filter und sort schöner einbauen.