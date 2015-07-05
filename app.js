// Matter.js module aliases
$(function () {
    var Engine = Matter.Engine,
        World = Matter.World,
        Bodies = Matter.Bodies,
        Events = Matter.Events,
        Common = Matter.Common,
        Body = Matter.Body;
    var keys = {};
// cr'ea'te a Matter.js engine
    var engine = Engine.create(document.body, {world: {gravity: {x: 0, y: 0}}});

// create two boxes and a ground
    var boxA = Bodies.circle(200, 600, 30, {slop: 0.8});
    var boxB = Bodies.circle(750, 150, 30, {slop: 0.8});
    var ground1 = Bodies.rectangle(0, 0, 1610, 60, {isStatic: true});
    var ground2 = Bodies.rectangle(0, 610, 1610, 60, {isStatic: true});
    var ground3 = Bodies.rectangle(0, 0, 60, 1610, {isStatic: true});
    var ground4 = Bodies.rectangle(800, 0, 60, 1610, {isStatic: true});

    //engine.world.bounds.max.x = 1200;
    //engine.world.bounds.max.y = 800;

// add all of the bodies to the world
    World.add(engine.world, [boxA, boxB, ground1, ground2, ground3, ground4]);

    Events.on(engine, 'collisionStart collisionActive collisionEnd', function (event) {
        //console.log(event);
    });

    Events.on(engine, 'afterTick', function(event) {
        var forceMagnitudeTmp1 = 0.00008 * boxB.mass;

        Body.applyForce(boxB, { x: 0, y: 0 }, {
            x: (forceMagnitudeTmp1 + Common.random() * forceMagnitudeTmp1) * (boxA.position.x > boxB.position.x ? 1 : -1),
            y: (forceMagnitudeTmp1 + Common.random() * forceMagnitudeTmp1) * (boxA.position.y > boxB.position.y ? 1 : -1)
        });

    });
// run the engine
    Engine.run(engine);

    var $body = $('body');
    $body.on('keydown', function (e) {
        keys[e.which] = true;
        moveBody();
    });

    $body.on('keyup', function (e) {
        delete keys[e.which];
        moveBody();
    });

    function moveBody() {
        var pressedKeys = [];
        for (var i in keys) {
            if (!keys.hasOwnProperty(i)) continue;
            pressedKeys.push(i);
        }
        var direction = direction(pressedKeys);
        var forceMagnitude =  0.0004 * boxA.mass;
        Body.applyForce(boxA, { x: 0, y: 0 },
            {
                x: (forceMagnitude + Common.random() * forceMagnitude) * direction.x,
                y: (forceMagnitude + Common.random() * forceMagnitude) * direction.y
            });

        function direction(pressedKeys) {
            var result = {x: 0, y: 0};
            if (pressedKeys.indexOf('37') >= 0) result.x = -1;
            if (pressedKeys.indexOf('38') >= 0) result.y = -1;
            if (pressedKeys.indexOf('39') >= 0) result.x = 1;
            if (pressedKeys.indexOf('40') >= 0) result.y = 1;
            return result;
        }
    }


});