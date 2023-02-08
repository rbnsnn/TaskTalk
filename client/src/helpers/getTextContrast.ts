export const getTextContrast = (color: string): string | Error => {
    if (color.length > 7 && color[0] !== '#') {
        throw Error(`The passed parameter should be a color in hex format i.e '#ffffff'`)
    } else {
        const temp: RegExpMatchArray | null = color
            .replace(
                /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
                (m, r, g, b) => '#' + r + r + g + g + b + b
            )
            .substring(1)
            .match(/.{2}/g)

        const rgb = temp!.map((x) => {
            return parseInt(x, 16)
        })

        const contrast = Math.round((rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000)

        return contrast > 125 ? 'black' : 'white'
    }
}
