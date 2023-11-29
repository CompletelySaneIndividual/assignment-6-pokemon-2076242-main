import UserInterfaceElement from "../UserInterfaceElement.js";
import SoundName from "../../enums/SoundName.js";
import { context, keys, sounds } from "../../globals.js";
import Vector from "../../../lib/Vector.js";

export default class ProgressBar{
    constructor(x, y, width, height, current, max, isXPBar = false) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.current = current;
        this.max = max;
        this.percent = 1;
        this.isXPBar = isXPBar;
    }
    update(current, max){
        this.current = current;
        this.max = max;
        this.calculatePercent();
        //this.percent = this.current/this.max;
    }
    calculatePercent(){
        this.percent = this.current/this.max;
        if(this.percent === NaN){
            this.percent = 0;
        }
        if(this.percent > 1){
            this.current -= this.max;
            this.percent = this.current / this.max;
        }
    }
    render(){
        context.save();

        context.fillStyle = 'black';
        context.fillRect(this.x, this.y, this.width, this.height)
        if(this.isXPBar){
            context.fillStyle = 'rgba(51, 187, 255, 1)';
            console.log(this.current + " / " + this.max + " = " + this.percent);
        }else{
            if(this.percent <= 1){
                context.fillStyle = 'rgba(51, 255, 0, 1)';
                if(this.percent <= 0.5){
                    context.fillStyle = 'rgba(255, 255, 25, 1)';
                    if(this.percent <= 0.25){
                        context.fillStyle = 'rgba(255, 0, 0, 1)';
                    }
                }
            }
        }
        context.fillRect(this.x +1, this.y +1, (this.width * this.percent) -2, this.height -2)
        
        
        //this.roundedRectangle(context, this.x, this.y, this.width, this.height);
        //context.fillStyle = 'rgba(51, 255, 0, 0.5)';
        //this.roundedRectangle(context, this.x, this.y, this.width * this.percent, this.height, true, false);

        context.restore();
    }
    roundedRectangle = (context, x, y, width, height, radius = 5, fill = false, stroke = true) => {
        context.save();
        context.beginPath();
        context.moveTo(x + radius, y);
        context.lineTo(x + width - radius, y);
        context.quadraticCurveTo(x + width, y, x + width, y + radius);
        context.lineTo(x + width, y + height - radius);
        context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        context.lineTo(x + radius, y + height);
        context.quadraticCurveTo(x, y + height, x, y + height - radius);
        context.lineTo(x, y + radius);
        context.quadraticCurveTo(x, y, x + radius, y);
        context.closePath();
    
        if (fill) {
            context.fill();
        }
    
        if (stroke) {
            context.stroke();
        }
    
        context.restore();
    }
}