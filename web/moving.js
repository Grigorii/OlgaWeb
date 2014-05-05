/**
 * Created by Grigoriy on 28.04.2014.
 */

// Tile object
function Tile(innerObjectId)
{


    this.innerObject = document.getElementById(innerObjectId);
    console.log(this.innerObject);
    if (this.innerObject)
    {
        this.innerObject.style.position = "absolute";

        this.x = 0;
        this.x += this.innerObject.offsetLeft;

        this.y = 0;
        this.y += this.innerObject.offsetTop;

        this.refresh = function()
        {
            this.innerObject.style.left = this.x + "px";
            this.innerObject.style.top = this.y+ "px";

            console.log("offsetLeft: " + this.innerObject.offsetLeft);
            console.log("offsetTop: " + this.innerObject.offsetTop);
        }

        this.move = function(x,  y)
        {
            this.x += x;
            this.y += y;
            this.refresh();
            console.log('x='+this.x +';y='+this.y);
        }



    }else{
        console.log('object not found');
    }
}

///
function Mover(movedTile)
{
    this.tile = movedTile;

    this.from = this.tile.x;


    this.cycle = function(){


        var now = (new Date().getTime()) - this.startTime; // Текущее время
        var progress = now / this.duration; // Прогресс анимации

        console.log("another iteration. progress: " + progress);

        var newX = (this.to - this.from) * this.delta(progress) + this.from;


        this.tile.move(newX,  this.tile.y);
        if (progress < 1){
            setTimeout( this.cycle, 10);
        }
    }


    this.start = function(length, duration, delta)
    {
        console.log("try to start");
        this.startTime = (new Date().getTime());
        this.to =  this.from + length;
        this.duration = duration;
        this.delta = delta;
        this.cycle();

    }

}

function linearDelta(progress) {
    return progress;
}


window.onload = function() {
    var tile = new Tile('img1');
    var mover = new Mover(tile);

    setTimeout(function(){
            mover.start(400, 2000, linearDelta);
            console.log("start executed");
        },
        1000);

   // tile.move(100, 100);
}
