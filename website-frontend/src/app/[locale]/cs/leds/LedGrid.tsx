// Cool, in the LED grid, the led is lit using a bitmask for comparison. The & (bitwise AND) operator
// helps check if the mask and the represented number have the same bit set at that position.
export default function LedGrid({ledCount, numberToRepresent}: {ledCount: number, numberToRepresent: number}) {
    return (
        <div className="flex flex-wrap w-fit mx-auto justify-center gap-1 md:gap-4 mb-8 p-1 md:p-4 bg-gray-100 rounded-xl">
           {[...Array(ledCount)].map((_, i) => (
                (numberToRepresent & (1 << (ledCount - 1 - i))) ? (
                    <img key={i} className="LED w-12 h-12 object-contain" src="/LEDOn.png" alt="LED" />
                ) : (
                    <img key={i} className="LED w-12 h-12 object-contain" src="/LEDOff.png" alt="LED" />
                )
           ))}
        </div>
    )
}