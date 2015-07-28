/**
 * Created by Grigoriy on 09.11.2014.
 *
 * File is intended to collect all operations connected with document screen
 */

/**
 * Object for storing size of screen
 *
 * @param screenWith
 * @param screenHeight
 * @constructor
 */

function ScreenRect(screenWith, screenHeight)
{
    console.log("new ScreenRect: " + screenWith + " " + screenHeight);
    var _screenWidth = screenWith;
    var _screenHeight = screenHeight;

    this.getWidth = function()
    {
        return _screenWidth;
    }

    this.getHeight = function()
    {
        return _screenHeight;
    }
}

/**
 * Object-creator for ScreenRect
 * @constructor
 */
function ScreenRectBuilder()
{
    var _screenWidth = 0;
    var _screenHeight = 0;

    this.setWidth = function(width)
    {
        _screenWidth = width;
        return this;
    };

    this.setHeight = function(height)
    {
        _screenHeight = height;
        return this;
    };

    this.build = function()
    {
        return new  ScreenRect(_screenWidth, _screenHeight);
    };
}


var getScreenSize;
/**
 *  Get current size of screen and returns it in  ScreenRect object
 *
 * @returns ScreenRect object, with current size of screen
 */
getScreenSize = function () {
    var builder = new ScreenRectBuilder();

    if (typeof( window.innerWidth ) == 'number') {
        builder.setWidth(window.innerWidth);
        builder.setHeight(window.innerHeight);
    } else if (document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight )) {
        builder.setWidth(document.documentElement.clientWidth);
        builder.setHeight(document.documentElement.clientHeight);
    } else if (document.body && ( document.body.clientWidth || document.body.clientHeight )) {
        builder.setWidth(document.body.clientWidth);
        builder.setHeight(document.body.clientHeight);
    }

    return builder.build();

};

/**
 *  Object for calculation moving band sizes
 */
function BondSizeValues(screenSize) {

    // значения констант
    this.visibleImagesCount = 10;
    this.nonvisibleImagesCount = 2;
    this.imagesHeightPerc = .15;
    this.imageMargin = 0;

    this.screenSize =  screenSize;

    this.totalImagesCount = function()
    {
        return this.visibleImagesCount + this.nonvisibleImagesCount;
    };

    this.getImageWidth = function()
    {
        return  (this.screenSize.getWidth() / this.visibleImagesCount);
    };

    this.getBandWidth = function()
    {
        return (this.getImageWidth() + this.imageMargin)*this.totalImagesCount();
    };

    this.getVisibleAreaWidth = function()
    {
        return (this.getImageWidth() + this.imageMargin/2)*this.visibleImagesCount;
    };

    this.getBandHeight = function()
    {
        console.log("getBandHeight: " + (this.screenSize.getHeight()*this.imagesHeightPerc));
        return this.screenSize.getHeight()*this.imagesHeightPerc;
    };

}

/**
 *
 * @returns {boolean} true if internet explorer is used
 */
var getIsIE = function(){
    return document.all?true:false;
}

function MousePosition(x, y){
    var _x = x;
    var _y = y;

    this.getX = function(){
        return _x;
    };

    this.getY = function(){
        return _y;
    };
}


var lastMousePosition = new MousePosition(0, 0);

/**
 *
 * @returns {MousePosition} position object
 */
var getMousePosition = function(){

    var tempX = 0;
    var tempY = 0;

    if (event) { // grab the x-y pos.s if browser is IE
        tempX = event.clientX + document.body.scrollLeft;
        tempY = event.clientY + document.body.scrollTop;

        if (tempX < 0){tempX = 0};
        if (tempY < 0){tempY = 0};

        lastMousePosition = new MousePosition(tempX, tempY);
    };

    return lastMousePosition;

}


