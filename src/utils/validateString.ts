export function containsLettersAndDigits(inputString: string) {
    const hasLetters = /[a-zA-Z]/.test(inputString); // Проверяем наличие букв
    const hasDigits = /[0-9]/.test(inputString); // Проверяем наличие цифр
    return hasLetters && hasDigits; // Возвращает true, если есть и буквы, и цифры
}
