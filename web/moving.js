/**
 * Created by Grigoriy on 28.04.2014.
 * набор инструментов для осуществления анимации
 */

/**
* Tile предназначен для инкапсуляции действий
* по перемещению DOM-элементов
* при создании нужно указать идентификатор объекта
* innerObjectId - идентификатор элемента DOM
* реализует следующие функции:
    moveTo(x, y)    - перемещает объект в заданные кординаты
    moveToX(x)      - перемещает объект, изменяя его x-координату, на заданную
    moveToY(y)      - перемещает объект, изменяя его y-координату, на заданную
    moveOn(deltaX, deltaY)    - перемещает объект, увеличивая его координаты на заданные величины
    moveOnX(deltaX)      - перемещает объект, увеличивая его x-координату, на заданную величину
    moveOnY(deltaY)      - перемещает объект, увеличивая его Y-координату, на заданную величину
*/

function Tile(innerObjectId)
{
    this.innerObject = document.getElementById(innerObjectId);

    if (this.innerObject)
    {
        this.innerObject.style.position = "absolute";

        this.x = 0;
        this.x += this.innerObject.offsetLeft;

        this.y = 0;
        this.y += this.innerObject.offsetTop;

        this.moveTo = function(x, y)
        {
            this.x = x;
            this.y = y;

            this.innerObject.style.left = this.x + "px";
            this.innerObject.style.top = this.y+ "px";

            console.log("this.innerObject.style.left:" + this.innerObject.style.left);
        };

        this.moveToX = function(x)
        {
            this.moveTo(x, this.y);
        };

        this.moveToY = function(y)
        {
            this.moveTo(this.x, y);
        };

        this.moveOn = function(deltaX,  deltaY)
        {
            this.moveTo(this.x + deltaX, this.y + deltaY);
        };

        this.moveOnX = function(deltaX)
        {

            this.moveOn(deltaX, 0);
        };

        this.moveOnY = function(deltaY)
        {
            this.moveOn(0, deltaY);
        };

    }else{
        console.log('Tile creation failed: object with specified id('+innerObjectId+') not found');
    }
}

var linearDelta = function(progress, distance) {
        return progress*distance;
    }

var sinusDelta = function(progress, distance) {
    return distance*((-Math.cos(progress*Math.PI)/2) + 0.5);
}

var cubDelta = function(progress, distance) {
    return distance*(progress*progress*progress);
}




var hiperDelta = function(progress, distance) {
    var base = progress/4.0 - .125;
    var sign = base?base<0?-1:1:0
    var power = 1.0/3.0;
    var easing = sign*Math.pow(Math.abs(base), power) +.5;

    console.log("base " + base);
    console.log("power " + power);
    console.log("easing " + easing);
    return distance*easing;
}

// l = progress*distance. distance
// 1 [0; 0.2] : y= x
//

var ceiling = function(value, ceil)
{
    return (value < ceil) ? value : ceil;
}

var flooring = function(value, floor)
{
    return (value > floor) ? (value - floor) : 0;
}


var comboEasing = function(progress, distance) {
    var totalDistance =  hiperDelta(ceiling(progress,.2), distance);
    totalDistance += linearDelta(
                            ceiling(flooring(progress, 0.2), 0.6),
                            distance
                        );
    totalDistance +=  hiperDelta(flooring(progress, 0.8), distance);

    return totalDistance;
}

function Animation(tile, from, to, duration, interval, delta)
{
    this.tile = tile;
    this.from = from;
    this.to = to;
    this.duration = duration;
    this.interval = interval;
    this.delta = delta;
    console.log(this.delta);
    this.startTime = 0;


    this.cycle = function(){
        console.log('cycle');
        var now = (new Date().getTime()) - this.startTime; // Текущее время
        var progress = now / duration; // Прогресс анимации
     //   console.log(this.delta);
        var position = this.from +  comboEasing(progress, (to - from));
        console.log('progress:'+progress);
        console.log('position:'+position);
        this.tile.moveToX(position);
        if (progress < 1){
            console.log('interval:'+interval);

            var self = this;
            setTimeout(function(){ self.cycle(); }, this.interval);
        }
    }

    this.start = function()
    {
        this.startTime = (new Date().getTime());
        this.tile.moveToX(this.from);
        this.cycle(this.delta);
    }


}


window.onload = function() {
    var tile = new Tile('img1');




    var animation = new Animation(tile, 50, 550, 3000, 10, linearDelta);

    animation.start();



/*    startTime = (new Date().getTime()) + 1000;

    var cycle = function(){
        var now = (new Date().getTime()) - startTime; // Текущее время
        console.log("now = " + now);
        var progress = now / duration; // Прогресс анимации
        console.log("progress = " + progress);
        var position = from +   linearDelta(progress, (to - from));
        console.log("progress = " + position);

        tile.moveToX(position);
        if (progress < 1){
            setTimeout(cycle, 10);
            counter++;
        }
    }

    setTimeout(cycle, 1000);



   /* setTimeout(function(){
            mover.start(400, 2000, linearDelta);
            console.log("start executed");
        },
        1000);
    */
   // tile.move(100, 100);
}
