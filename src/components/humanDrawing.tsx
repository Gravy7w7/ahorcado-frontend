type HumanDrawingProps = {
    numberOfGuesses: number;
};

const HEAD = (
    <circle
        cx="200"
        cy="80"
        r="30"
        stroke="black"
        strokeWidth="5"
        fill="none"
    />
);

const BODY = (
    <line
        x1="200"
        y1="110"
        x2="200"
        y2="190"
        stroke="black"
        strokeWidth="5"
    />
);

const RIGHT_ARM = (
    <line
        x1="200"
        y1="130"
        x2="250"
        y2="160"
        stroke="black"
        strokeWidth="5"
    />
);

const LEFT_ARM = (
    <line
        x1="200"
        y1="130"
        x2="150"
        y2="160"
        stroke="black"
        strokeWidth="5"
    />
);

const RIGHT_LEG = (
    <line
        x1="200"
        y1="190"
        x2="250"
        y2="240"
        stroke="black"
        strokeWidth="5"
    />
);

const LEFT_LEG = (
    <line
        x1="200"
        y1="190"
        x2="150"
        y2="240"
        stroke="black"
        strokeWidth="5"
    />
);

const BODY_PARTS = [
    HEAD,
    BODY,
    RIGHT_ARM,
    LEFT_ARM,
    RIGHT_LEG,
    LEFT_LEG,
];

export function HumanDrawing({
    numberOfGuesses,
}: HumanDrawingProps) {

    return (
        <div>

            <svg height="400" width="300">

                {/* Horca */}
                <line
                    x1="20"
                    y1="380"
                    x2="250"
                    y2="380"
                    stroke="black"
                    strokeWidth="5"
                />

                <line
                    x1="50"
                    y1="380"
                    x2="50"
                    y2="20"
                    stroke="black"
                    strokeWidth="5"
                />

                <line
                    x1="50"
                    y1="20"
                    x2="200"
                    y2="20"
                    stroke="black"
                    strokeWidth="5"
                />

                <line
                    x1="200"
                    y1="20"
                    x2="200"
                    y2="50"
                    stroke="black"
                    strokeWidth="5"
                />

                {/* Cuerpo */}
                {BODY_PARTS.slice(0, numberOfGuesses)}

            </svg>

        </div>
    );
}