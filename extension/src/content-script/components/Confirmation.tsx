type Props = {
    handleConfirm: () => void;
};

function Confirmation({ handleConfirm }: Props) {
    return (
        <div
            style={{
                position: "fixed",
                top: "10",
                right: "0",
                padding: "10px",
                zIndex: 10000,
                border: "1px solid #000",
                backgroundColor: "#fff",
                borderRadius: "5px",
                boxShadow: "0 0 10px rgba(0,0,0,0.5)",
            }}
        >
            <div
                style={{
                    display: "flex",

                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "10px",
                }}
            >
                <span
                    style={{
                        cursor: "pointer",
                        color: "red",
                    }}
                    onClick={handleConfirm}
                >
                    X
                </span>
            </div>

            <p>Are you sure you want to proceed?</p>
        </div>
    );
}

export default Confirmation;
