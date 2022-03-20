export class ResponseExceptions {

    private static exceptionMessages: Map<string, string> = new Map<string, string>([
        ["DEFAULT",                     "Coś poszło nie tak."],
        ["Poll is in draft state.",     "Ta ankieta nie jest jeszcze aktywna."],
        ["Email is in use.",            "Podany adres email jest już zajęty."],
        ["Inactive token.",             "Podany token jest nieaktywny."],
        ["Poll not found.",             "Nie odnaleziono ankiety."],
        ["User not found.",             "Nie odnaleziono użytkownika."],
        ["Wrong password.",             "Nieprawidłowe hasło."],
        ["Wrong poll option.",          "Nieprawidłowy wybór głosu."],
    ]);

    public static TranslateException = (exceptionMessage: string): string => {
        return this.exceptionMessages.get(exceptionMessage) ?? "Coś poszło nie tak.";
    }
}