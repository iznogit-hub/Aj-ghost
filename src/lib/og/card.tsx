export function ogCard(kicker: string, title: string, footer: string) {
    return (
        <div
            style={{
                width: "1200px",
                height: "630px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                backgroundColor: "#030a1a",
                color: "#ffffff",
                padding: "72px",
            }}
        >
            <div style={{ display: "flex", letterSpacing: "0.28em", textTransform: "uppercase", color: "#d4a827", fontSize: 22 }}>
                {kicker}
            </div>
            <div style={{ display: "flex", fontSize: 64, lineHeight: 1.05, color: "#ffffff", maxWidth: "1000px" }}>
                {title}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", width: "100%", color: "#f0d889", fontSize: 28 }}>
                <div style={{ display: "flex" }}>{footer}</div>
                <div style={{ display: "flex" }}>ajghost.com</div>
            </div>
        </div>
    );
}
