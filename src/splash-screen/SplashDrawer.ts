
const animationConstants = {
    lateralLines: {
        exponent: 0.7,
        multiplier: 150,
        startFrame: 60
    }
}

export class SplashDrawer {
    private canvas: CanvasRenderingContext2D | null;
    private drawing: boolean;
    private frames: number;

    private animationCalculations = {
        canvasCenter: {
            x: 0,
            y: 0,
        },
        centerRadius: 0
    };

    constructor() {
        this.canvas = null;
        this.drawing = false;
        this.frames = 0;
    }

    public setCanvasSize(width: number, height: number) {
        if (!this.canvas) return;

        this.canvas.canvas.width = width;
        this.canvas.canvas.height = height;

        this.updateAnimationCalculations();
    }

    private updateAnimationCalculations() {
        if (!this.canvas) return;

        // Center radius
        const minDimension = Math.min(this.canvas.canvas.width / 2, this.canvas.canvas.height / 2);
        this.animationCalculations.centerRadius = Math.round(minDimension * 0.2);

        // Canvas center
        this.animationCalculations.canvasCenter.x = Math.round(this.canvas.canvas.width / 2);
        this.animationCalculations.canvasCenter.y = Math.round(this.canvas.canvas.height / 2);
    }

    public setCanvas(canvas: CanvasRenderingContext2D) {
        this.canvas = canvas;
        this.updateAnimationCalculations();
    }

    public beginDraw() {
        this.drawing = true;
        window.requestAnimationFrame(() => this.draw());
    }

    public stopDraw() {
        this.drawing = false;
    }

    private draw() {
        if (this.canvas) {
            this.frames++;

            if (this.frames > animationConstants.lateralLines.startFrame) {
                this.drawLeftLine();
                this.drawRightLine();
            }
        }

        if (this.drawing) {
            window.requestAnimationFrame(() => this.draw());
        }
    }

    // private drawBackground() {
    //
    // }

    private drawLeftLine() {
        if (!this.canvas) return;

        this.canvas.strokeStyle = "#D9B639";
        this.canvas.lineWidth = 3;

        this.canvas.beginPath();

        this.canvas.moveTo(
            0,
            this.canvas.canvas.height / 2
        );

        this.canvas.lineTo(
            Math.min(
                Math.round(Math.pow((this.frames - animationConstants.lateralLines.startFrame) * animationConstants.lateralLines.multiplier, animationConstants.lateralLines.exponent)),
                this.animationCalculations.canvasCenter.x - this.animationCalculations.centerRadius
            ),
            this.canvas.canvas.height / 2
        );

        this.canvas.stroke();
    }

    private drawRightLine() {
        if (!this.canvas) return;

        // radial gradient from center to the edges
        const gradient = this.canvas.createRadialGradient(
            this.canvas.canvas.width / 2,
            this.canvas.canvas.height / 2,
            0,
            this.canvas.canvas.width / 2,
            this.canvas.canvas.height / 2,
            Math.max(this.canvas.canvas.width / 2, this.canvas.canvas.height / 2)
        );

        gradient.addColorStop(0, "#D9B639");
        gradient.addColorStop(0.13, "#BF9B30");
        gradient.addColorStop(0.5, "#FFBF00");
        gradient.addColorStop(1, "#BF9B30");

        this.canvas.strokeStyle = gradient;
        this.canvas.lineWidth = 3;

        this.canvas.beginPath();

        this.canvas.moveTo(
            this.canvas.canvas.width,
            this.canvas.canvas.height / 2
        );

        this.canvas.lineTo(
            Math.max(
                this.canvas.canvas.width - Math.round(Math.pow((this.frames - animationConstants.lateralLines.startFrame) * animationConstants.lateralLines.multiplier, animationConstants.lateralLines.exponent)),
                this.animationCalculations.canvasCenter.x + this.animationCalculations.centerRadius
            ),
            this.canvas.canvas.height / 2
        );

        this.canvas.stroke();
    }
}


