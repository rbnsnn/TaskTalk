export const capitalize = (s: string): string => {
    const str = s.toLowerCase()
    return str[0].toUpperCase() + str.slice(1)
}
