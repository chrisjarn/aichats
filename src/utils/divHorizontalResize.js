// HORIZONTAL RESIZING ( FOR LATERAL PANELS )

var fixedSize = null
function makeResizable(elId) {
    const resizer = document.getElementById(elId)

    // The current position of mouse
    let x = 0
    let y = 0
    // Width of left side
    let leftWidth = 0

    const leftSide = resizer.previousElementSibling
    const rightSide = resizer.nextElementSibling
    fixedSize = fixedSize==null?Number(leftSide.style.width.replace(/[^\d\.\-]/g, '')):fixedSize;
    // Attach the handler

    const mouseMoveHandler = function (e) {
        // How far the mouse has been moved
        const dx = e.clientX - x
        const dy = e.clientY - y
        const newLeftWidth =
            ((leftWidth + dx) * 100) /
            resizer.parentNode.getBoundingClientRect().width

        if(newLeftWidth < fixedSize){
            console.log("peligro")
        }else{
            leftSide.style.width = `${newLeftWidth}%`
        }
    }

    const mouseDownHandler = function (e) {
        // Get the current mouse position
        x = e.clientX
        y = e.clientY
        leftWidth = leftSide.getBoundingClientRect().width
        resizer.style.cursor = "col-resize"
        // Attach the listeners to `document`
        document.addEventListener("mousemove", mouseMoveHandler)
        document.addEventListener("mouseup", mouseUpHandler)
    }

    const mouseUpHandler = function () {
        resizer.style.removeProperty("cursor")
        document.body.style.removeProperty("cursor")

        leftSide.style.removeProperty("user-select")
        leftSide.style.removeProperty("pointer-events")

        rightSide.style.removeProperty("user-select")
        rightSide.style.removeProperty("pointer-events")

        // Remove the handlers of `mousemove` and `mouseup`
        document.removeEventListener("mousemove", mouseMoveHandler)
        document.removeEventListener("mouseup", mouseUpHandler)
    }

    resizer.addEventListener("mousedown", mouseDownHandler)
}

export { makeResizable }
