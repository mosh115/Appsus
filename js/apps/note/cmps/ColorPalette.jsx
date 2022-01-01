export function ColorPalette({ changeBgColor }) {

    const setBgColor = (color) => {
        changeBgColor(color);
    }
    const colors = ['#FFF9F9', '#FFAEBC', '#B4F8C8', '#A0E7E5', '#FBE7C6', '#D77FA1', '#BAABDA', '#D6E5FA']

    return (
        <div className="color-palette">
            {colors.map(color => {
                return <div
                    onClick={() => setBgColor(color)}
                    style={{ backgroundColor: color }}
                    key={color}
                >
                </div>
            })}

        </div>
    )
}