export interface Irgb {
    r: number
    g: number
    b: number
}

export const hexToRgb = (hex: string): Irgb | null => {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i

    const hexTemp = hex.replace(shorthandRegex, (m, r, g, b) => {
        return r + r + g + g + b + b
    })

    const rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexTemp)
    return rgb
        ? {
              r: parseInt(rgb[1], 16),
              g: parseInt(rgb[2], 16),
              b: parseInt(rgb[3], 16),
          }
        : null
}
