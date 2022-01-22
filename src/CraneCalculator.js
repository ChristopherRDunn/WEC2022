export const seekNearest = (inProgressArray, headPosition) => {
    var distanceRight = inProgressArray.length;
    var distanceLeft = inProgressArray.length;

    var right = true;
    
    for (let i = headPosition; i < inProgressArray.length; i++) {//Finds the value closest to the seek head
        if(inProgressArray[i] > 0){
            distanceRight = i - headPosition;
            break;
        }
    }
    for (let i = headPosition; i > inProgressArray.length; i--) {//Finds the value closest to the seek head
        if(inProgressArray[i] > 0){
            distanceLeft = headPosition - i;
            right = false;
            break;
        }
        if(headPosition - i > distanceRight){
            break;
        }
    }
    var source = 0
    if(right){
        source = headPosition + distanceRight;
    }else{
        source = headPosition - distanceLeft;
    }
    distanceRight = inProgressArray.length;
    distanceLeft = inProgressArray.length;
    var right = true;
    for (let i = source; i < inProgressArray.length; i++) {//Finds the value closest to the seek head
        if(inProgressArray[i] < 0){
            distanceRight = i - source;
            break;
        }
    }
    for (let i = source; i > inProgressArray.length; i--) {//Finds the value closest to the seek head
        if(inProgressArray[i] < 0){
            distanceLeft = source - i;
            right = false;
            break;
        }
        if(source - i > distanceRight){
            break;
        }
    }
    var destination = 0
    if(right){
        destination = source + distanceRight;
    }else{
        destination = source - distanceLeft;
    }
    return [headPosition,source,destination];
}
export const appendSteps = (head, source, destination) => {
    var outputSteps = [];

    if(head > source){
        for(let i = head - source; i > 0; i--)outputSteps.push(1);
        outputSteps.push(3);
    }else if (head < source){
        for(let i = source - head; i > 0; i--)outputSteps.push(2);
        outputSteps.push(3);
    }else{
        outputSteps.push(3);
    }
    if(source > destination){
        for(let i = source - destination; i > 0; i--)outputSteps.push(1);
        outputSteps.push(4);
    }else{
        for(let i = destination - source; i > 0; i--)outputSteps.push(2);
        outputSteps.push(4);
    }
    return outputSteps;
}

export const input = (input, process, output) => {
    var IPorIO = false;
    if (input.length <= 0) return "input field is required";
    if (process.length > 0 && output.length == 0) {
        IPorIO = true;
    } else if (process.length == 0 && output.length > 0) {
        IPorIO = false;
    } else {
        return "output or process required"
    }

    try {
        var inputArray = input.split(" ");
        var inputIntArray = [];
        for (let i = 0; i < inputArray.length; i++) {
            inputIntArray.push(parseInt(inputArray[i]));
        }
        if (IPorIO) {
            var processArray = process.split(" ");
            var processIntArray = [];
            for (let i = 0; i < processArray.length; i++) {
                processIntArray.push(parseInt(processArray[i]));
                if (processIntArray[i] > 4 || processIntArray[i] < 0) return;
            }
        } else {
            var outputArray = output.split(" ");
            var outputIntArray = [];
            for (let i = 0; i < outputArray.length; i++) {
                outputIntArray.push(parseInt(outputArray[i]));
            }
        }
    } catch (err) {
        return "Formatting Error";
    }

    if (IPorIO) {
        //Do the steps
        var headPosition = 0;
        var headHasBox = false;
        var done = false;
        for (let i = 0; i < processIntArray.length; i++) {
            if (!done) {
                switch (processIntArray[i]) {
                    case 1: //Move Left
                        if (headPosition > 0) {
                            headPosition--;
                        }
                        break;
                    case 2: //Move Right
                        if (headPosition < inputArray.length - 1) {
                            headPosition++;
                        }
                        break;
                    case 3: //Lift
                        if (!headHasBox) {
                            headHasBox = true;
                            inputIntArray[headPosition] -= 1;
                        }
                        break;
                    case 4: //Drop
                        if (headHasBox) {
                            headHasBox = false;
                            inputIntArray[headPosition] += 1;
                        }
                        break;
                    default:
                        done = true;
                }
            }
        }
        var outString = "";
        outString = outString.concat(inputIntArray[0]);
        for (let i = 1; i < inputArray.length; i++) {
            outString = outString.concat(" ", inputIntArray[i]);
        }
        
        return outString;        }
        
    }else{
        var DistanceVector = [];
        var headPosition = 0;
        var result = "";
        var sum = 0;
        var discrepancy = 0;
        var source = 0;
        var destination = 0;
        if(inputIntArray.length != outputIntArray.length){
            return "The number of input and output values must match"
        }
        for (let i=0; i<inputIntArray.length; i++) {
            var x = inputIntArray[i] - outputIntArray[i];
            DistanceVector.push(x);
            sum = sum + x;
            discrepancy = discrepancy + Math.abs(x);
        }
        if (sum != 0){
            return "Invalid input, output combination, totals must match"
        }

        //0 means done
        //1 means left
        //2 means right
        //3 means lift
        //4 means drop
        //We want to move boxes from positive to negative
        for(let z=discrepancy; z>0; z -= 2){
            var seekout = seekNearest(DistanceVector, headPosition);
            source = seekout[1];
            destination = seekout[2];

            var appendout = appendSteps(headPosition, source, destination);
            for(let i=0; i<appendout.length; i++){
                result = result.concat(appendout[i]);
                result = result.concat(" ");
            }

            headPosition = destination;
            DistanceVector[source] -= 1;
            DistanceVector[destination] += 1;
        }

        result = result.concat(0);
        return result;
    }
}
export const randomize = (input) => {
    if (input.length <= 0) return "input field is required";
    try {
        var inputArray = input.split(" ");
        var sum = 0;
        for (let i = 0; i < inputArray.length; i++) {
            sum = sum + parseInt(inputArray[i]);
        }
    } catch (err) {
        return "Formatting Error";
    }

    var outIntArray = new Array(inputArray.length).fill(0);
    for(sum; sum > 0; sum--){
        var rand = Math.floor(Math.random() * inputArray.length);
        outIntArray[rand]++;
    }

    var outString = "";
    outString = outString.concat(outIntArray[0]);
    for(let i = 1; i < inputArray.length; i++){
        outString = outString.concat(" ");
        outString = outString.concat(outIntArray[i]);
    }

    return outString;
}