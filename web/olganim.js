/**
 * Created by Grigoriy on 13.09.2014.
 *
 * Набор классов для перемещения DOM-элементов
 */

/**
 * Tile предназначен для инкапсуляции действий
 * по перемещению DOM-элементов
 * при создании нужно указать идентификатор объекта
 * innerObjectId - идентификатор элемента DOM
 * реализует следующие функции:
 moveTo(x, y)    - перемещает объект в заданные кординаты
 moveOn(deltaX, deltaY)    - перемещает объект, увеличивая его координаты на заданные величины
 moveOnX(deltaX)      - перемещает объект, увеличивая его x-координату, на заданную величину
 moveOnY(deltaY)      - перемещает объект, увеличивая его Y-координату, на заданную величину
 */

function Tile(innerObjectId)
{
    this.innerObject = document.getElementById(innerObjectId);

    if (this.innerObject) {
        this.innerObject.style.position = "absolute";

        this.x = 0;
        this.x += this.innerObject.offsetLeft;

        this.y = 0;
        this.y += this.innerObject.offsetTop;

        this.getX = function () {
            return this.x;
        };

        this.getY = function () {
            return this.y;
        };

        this.moveTo = function (x, y) {
            this.x = x;
            this.y = y;

            this.innerObject.style.left = this.x + "px";
            this.innerObject.style.top = this.y + "px";
        };

        this.moveOn = function (deltaX, deltaY) {
            this.moveTo(this.x + deltaX, this.y + deltaY);
        };

        this.moveOnX = function (deltaX) {

            this.moveOn(deltaX, 0);
        };

        this.moveOnY = function (deltaY) {
            this.moveOn(0, deltaY);
        }

    } else {
        console.error('Tile creation failed: object with specified id(' + innerObjectId + ') not found');
    }
}


/**
 * TileView предназначен для инкапсуляции действий по перемещению DOM-элемента
 * внутри заданного прямоугольника, если объект выходит за границы прямоугольника,
 * то он появляется с противоположного его конца.
 *
 * При создании нужно указать элемент - Tile и четырехугольник: top, left, width, height
 *
 *  moveTo(x, y)    - перемещает объект в заданные кординаты
 *  moveOn(deltaX, deltaY)    - перемещает объект, увеличивая его координаты на заданные величины
 *  moveOnX(deltaX)      - перемещает объект, увеличивая его x-координату, на заданную величину
 *  moveOnY(deltaY)      - перемещает объект, увеличивая его Y-координату, на заданную величину
 *
*/
function TileView(tile, top, left, width, height)
{
    this.tile = tile;
    this.top = top;
    this.left = left;
    this.width = width;
    this.height = height;

    // рассчитываем позицию Tile относительно начала прямоугольника
    this.tile.moveOn( this.left, this.top);


    this.moveTo = function(x, y)
    {
        // пересчитываем координаты так, чтобы они оставались внутри прямоугольника
        while(x < 0)
            x += this.width;

        while(y < 0)
            y += this.height;

        var newX = this.left + x % this.width;
        var newY = this.top +y % this.height;

        this.tile.moveTo( newX, newY);
    };

    this.moveOn = function(deltaX, deltaY)
    {
        // пересчитываем глобальные координаты tile в локальные(относитльно заданного прямоугольника)
        // и сохраняем в локальных переменных
        var newX = this.tile.getX() - this.left;
        var newY = this.tile.getY()  - this.top;
        console.log("this.moveOn " + newX );

        this.moveTo(newX + deltaX, newY + deltaY);
    };



    this.moveOnX = function(deltaX)
    {
        console.log("this.moveOnX " + deltaX );
        this.moveOn(deltaX, 0);
    };


    this.moveOnY = function(deltaY)
    {
        this.moveOn(0, deltaY);
    }

}

/***
 * AnimationX - объект для перемещения объекта tile по X координате
 *
 * start(speedFunc, interval) - начало движения, в качестве аргумента указывается
 *           speedFunc - функция скорости(в зависимости от времени)
 *           interval - интервал времени(в микросекундах), через который выполняется пересчет местоположения
 *
 * stop() - конец движения
 */
function AnimationX(tile)
{
    this.tile = tile;
    this.terminated = 1;

    this.cycle = function(){

        var now = (new Date().getTime()) - this.startTime; // Текущее время

        console.log(this.speedFunc);
        console.log(this.speedFunc(now));
        console.log(now - this.lastCicleTime);
        var position = this.speedFunc(now)* (now - this.lastCicleTime) ;
        this.lastCicleTime = now;

        console.log( this.tile);
        console.log( this.tile.moveToX);
        this.tile.moveOnX(position);
        if (!this.terminated){
            var self = this;
            setTimeout(function(){ self.cycle(); }, this.interval);
        }
    };

    this.start = function(speedFunc, interval)
    {
        this.interval =  interval;
        this.speedFunc =  speedFunc;
        this.startTime = new Date().getTime();
        this.lastCicleTime = 0;
        this.terminated = 0;

        this.cycle();
    };

    this.stop = function()
    {
        this.terminated = 1;
    };

}


var constantSpeed = function(time)
{
    return 0.05;
}

