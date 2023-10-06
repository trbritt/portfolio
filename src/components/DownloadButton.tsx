import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { addPropertyControls, ControlType } from "framer"

const onHoverStyle = {
    scale: 1.05,
    cursor: "pointer",
}

const spring = {
    type: "spring",
    stiffness: 300,
    damping: 30,
}

/**
 * @framerSupportedLayoutWidth any
 * @framerSupportedLayoutHeight any
 */
export default function Download(props) {
    const [bloblUrl, setBlobUrl] = useState(null)

    const {
        fileName,
        title,
        tint,
        style,
        file,
        radius,
        topLeftRadius,
        topRightRadius,
        bottomRightRadius,
        bottomLeftRadius,
        isMixedRadius = false,
        stylePadding,
        topLeftPadding,
        topRightPadding,
        bottomRightPadding,
        bottomLeftPadding,
        isMixedPadding = false,
        font,
    } = props

    const borderRadius = isMixedRadius
        ? `${topLeftRadius}px ${topRightRadius}px ${bottomRightRadius}px ${bottomLeftRadius}px`
        : `${radius}px`

    const padding = isMixedPadding
        ? `${topLeftPadding}px ${topRightPadding}px ${bottomRightPadding}px ${bottomLeftPadding}px`
        : `${stylePadding}px`

    const handleClick = async () => {
        const response = await fetch(props.file)
        const blob = await response.blob()
        const blobUrl = URL.createObjectURL(blob)
        setBlobUrl(blobUrl)
    }

    useEffect(() => {
        handleClick()
    }, [])

    return (
        <motion.div style={{ ...style, ...containerStyle }}>
            <motion.div
                style={{
                    borderRadius,
                    padding,
                    backgroundColor: tint,
                    fontSize: font.size,
                    fontWeight: font.weight,
                    color: font.color,
                    fontFamily: `'${font.fontFace}'`,
                    overflow: "visible",
                }}
                whileHover={onHoverStyle}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
                <a
                    href={bloblUrl}
                    style={{ textDecoration: "none", color: font.color }}
                    download={fileName}
                >
                    {title}
                </a>
            </motion.div>
        </motion.div>
    )
}

addPropertyControls(Download, {
    fileName: {
        type: ControlType.String,
        defaultValue: "File",
    },
    tint: {
        title: "Background Color",
        type: ControlType.Color,
        defaultValue: "#242424",
    },
    title: {
        title: "Label",
        type: ControlType.String,
        defaultValue: "Download!",
    },
    font: {
        type: ControlType.Object,
        controls: {
            fontFace: {
                type: ControlType.String,
                defaultValue: "Inter",
            },
            size: { type: ControlType.Number, defaultValue: 18 },
            color: { type: ControlType.Color, defaultValue: "#fff" },
            weight: {
                type: ControlType.Enum,
                defaultValue: "bold",
                options: ["normal", "bold", "bolder", "lighter"],
            },
        },
    },
    file: {
        title: "File",
        type: ControlType.File,
        allowedFileTypes: [],
    },
    radius: {
        type: ControlType.FusedNumber,
        title: "Radius",
        defaultValue: 8,
        toggleKey: "isMixedRadius",
        toggleTitles: ["All", "Individual"],
        valueKeys: [
            "topLeftRadius",
            "topRightRadius",
            "bottomRightRadius",
            "bottomLeftRadius",
        ],
        valueLabels: ["T", "R", "B", "L"],
        min: 0,
    },
    stylePadding: {
        type: ControlType.FusedNumber,
        title: "Padding",
        defaultValue: 16,
        toggleKey: "isMixedPadding",
        toggleTitles: ["All", "Individual"],
        valueKeys: [
            "topLeftPadding",
            "topRightPadding",
            "bottomRightPadding",
            "bottomLeftPadding",
        ],
        valueLabels: ["T", "R", "B", "L"],
        min: 0,
    },
})

const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "visible",
}
