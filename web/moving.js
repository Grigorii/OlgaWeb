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
    moveOn(x, y)    - перемещает объект, увеличивая его координаты на заданные величины
    moveOnX(x)      - перемещает объект, увеличивая его x-координату, на заданную величину
    moveOnY(y)      - перемещает объект, увеличивая его x-координату, на заданную величину
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
        }

        this.moveToX = function(x)
        {

            this.moveTo(x, this.y);
        }

        this.moveToY = function(y)
        {
            this.moveTo(this.x, y);
        }

        this.moveOn = function(x,  y)
        {
            this.moveTo(this.x + x, this.y + y);
        }

        this.moveOnX = function(x)
        {

            this.moveOn(x, 0);
        }

        this.moveOnY = function(y)
        {
            this.moveOn(0, y);
        }

    }else{
        console.log('Tile creation failed: object with specified id('+innerObjectId+') not found');
    }
}

var linearDelta = function(progress, distance) {
        return progress*distance;
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
        var position = this.from +  linearDelta(progress, (to - from));
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




    var animation = new Animation(tile, 50, 350, 1000, 100, linearDelta);

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
