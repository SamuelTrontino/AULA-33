class Ligacao {
    constructor(bodyA, bodyB) {
    var ultimaligacao = bodyA.body.bodies.length -2
    this.link = Constraint.create({
        bodyA:bodyA.body.bodies[ultimaligacao],
        pointA:{x:0,y:0},
        bodyB:bodyB,
        pointB:{x:0,y:0},
        length:-10,
        stiffness:0.01
    })
    World.add(world,this.link)
    }

    soltar() {
        World.remove(world,this.link)
        

    }
}