
const box = [ // s-box table
  ["63","7c","77","7b","f2","6b","6f","c5","30","01","67","2b","fe","d7","ab","76"], //0
  ["ca","82","c9","7d","fa","59","47","f0","ad","d4","a2","af","9c","a4","72","c0"], //1
  ["b7","fd","93","26","36","3f","f7","cc","34","a5","e5","f1","71","d8","31","15"], //2
  ["04","c7","23","c3","18","96","05","9a","07","12","80","e2","eb","27","b2","75"], //3
  ["09","83","2c","1a","1b","6e","5a","a0","52","3b","d6","b3","29","e3","2f","84"], //4
  ["53","d1","00","ed","20","fc","b1","5b","6a","cb","be","39","4a","4c","58","cf"], //5
  ["d0","ef","aa","fd","43","4d","33","85","45","f9","02","7f","50","3c","9f","a8"], //6
  ["51","a3","40","8f","92","9d","38","f5","bc","b6","da","21","10","ff","f3","d2"], //7
  ["cd","0c","13","ec","5f","97","44","17","c4","a7","7e","3d","64","5d","19","73"], //8
  ["60","81","4f","dc","22","2a","90","88","46","ee","b8","14","de","5e","0b","db"], //9
  ["e0","32","3a","0a","49","06","24","5c","c2","d3","ac","62","91","95","e4","79"], //a
  ["e7","c8","37","6d","8d","d5","4e","a9","6c","56","f4","ea","65","7a","ae","08"], //b
  ["ba","78","25","2e","1c","a6","b4","c6","e8","dd","74","1f","4b","bd","8b","8a"], //c
  ["70","3e","b5","66","48","03","f6","0e","61","35","57","b9","86","c1","1d","9e"], //d
  ["e1","f8","98","11","69","d9","8e","94","9b","1e","87","e9","ce","55","28","df"], //e
  ["8c","a1","89","0d","bf","e6","42","68","41","99","2d","0f","b0","54","bb","16"] //f
];

const hexDict = {
  a: 10,
  b: 11,
  c: 12,
  d: 13,
  e: 14,
  f: 15,
}

const RCON = [
  ['01','00','00','00'],
  ['02','00','00','00'],
  ['04','00','00','00'],
  ['08','00','00','00'],
  ['10','00','00','00'],
  ['20','00','00','00'],
  ['40','00','00','00'],
  ['80','00','00','00'],
  ['1b','00','00','00'],
  ['36','00','00','00'],
]

const galoisField = [ //pre defined for encryption algo
  ['02','03','01','01'],
  ['01','02','03','01'],
  ['01','01','02','03'],
  ['03','01','01','02']
]

function stringToHex(str) {
  var arr = [];
  for (var i = 0; i < str.length; i++) {
         arr[i] = (str.charCodeAt(i).toString(16)).slice(-4);
  }
  return arr.join("");
}

function decimalToHex(decimal) {
  var size = 8;

  if (decimal >= 0) {
    var hexadecimal = decimal.toString(16);

    while ((hexadecimal.length % size) != 0) {
      hexadecimal = "" + 0 + hexadecimal;
    }

    return hexadecimal;
  } else {
    var hexadecimal = Math.abs(decimal).toString(16);
    while ((hexadecimal.length % size) != 0) {
      hexadecimal = "" + 0 + hexadecimal;
    }

    var output = '';
    for (let i = 0; i < hexadecimal.length; i++) {
      output += (0x0F - parseInt(hexadecimal[i], 16)).toString(16);
    }

    output = (0x01 + parseInt(output, 16)).toString(16);
    return output;
  }
}

function create4X4(input){
  var matrixes = []

  while (input.length >= 16){
    var matrix4X4 = [];
    var offset = -1;
    var reset = 0;

    for (let x = 0;x < 16;x++){
      if (x%4 == 0){
        offset += 1
        matrix4X4[offset] = [];
        reset = 0;

        matrix4X4[offset][reset] = stringToHex(input.slice(x,x+1));
      }else{
        matrix4X4[offset][reset] = stringToHex(input.slice(x,x+1));
      }
      reset += 1;
    }
    input = input.slice(16);
    matrixes.push(matrix4X4);
  }

  if (input.length > 0){
    var matrix4X4 = [];
    var offset = -1;
    var reset = 0;

    for (let x = 0;x < 16;x++){
      if (x%4 == 0){
        offset += 1
        matrix4X4[offset] = [];
        reset = 0;
        if (x < input.length){
          matrix4X4[offset][reset] = stringToHex(input.slice(x,x+1));
        }else{
          matrix4X4[offset][reset] = stringToHex(' '); //pad with a space
        }
      }else{
        if (x < input.length){
          matrix4X4[offset][reset] = stringToHex(input.slice(x,x+1));
        }else{
          matrix4X4[offset][reset] = stringToHex(' '); //pad with a space
        }
      }
      reset += 1;
    }
    input = input.slice(16);
    matrixes.push(matrix4X4);
  }

  return matrixes;
}

function addRoundKey(matrix1,matrix2){ //does XoR conditional on each intersecting column of the matrixes
  let nMatrix = []
  for(let x = 0;x<matrix1.length;x++){
    //console.log(matrix1[x] + "," + matrix2[x]);
    nMatrix[x] = decimalToHex(parseInt(matrix1[x],16) ^ parseInt(matrix2[x],16)).slice(-2);
  }

  return nMatrix;
}

function addRoundKey2(matrix1,matrix2){ //does XoR conditional on whole matrix instead
  let nMatrix = [ [], [], [], [] ]
  for(let x = 0;x<matrix1.length;x++){
    for(let y = 0;y<matrix1[x].length;y++){
      nMatrix[x][y] = decimalToHex(parseInt(matrix1[x][y],16) ^ parseInt(matrix2[x][y],16)).slice(-2);
    }
  }

  return nMatrix;
}

function keyScheduleRoundKey(matrix1,matrix2,RCON){ //does XoR conditional on each intersecting column of the matrixes
  let nMatrix = []
  for(let x = 0;x<matrix1.length;x++){
    //console.log(matrix1[x] + "," + matrix2[x] + "," + RCON[x]);
    nMatrix[x] = decimalToHex(parseInt(matrix1[x],16) ^ parseInt(matrix2[x],16) ^ parseInt(RCON[x],16)).slice(-2);
  }

  return nMatrix;
}

function charIsLetter(char) {
  if (typeof char !== 'string') {
    return false;
  }
  return /^[a-zA-Z]+$/.test(char); //regular expression to test that input is a character and not a number
}

function subBytes(matrix){ //substitute all the matrix values based on what's in s_box
  let nMatrix = []
  for(let x = 0;x<matrix.length;x++){
    nMatrix[x] = matrix[x]; //clone matrix to make sure it doesn't shift the original
  }

  for(let x = 0;x<nMatrix.length;x++){
    var firstPart = nMatrix[x].slice(0,1); //get first part of the hex code
    var lastPart = nMatrix[x].slice(1); //get last part

    if (charIsLetter(firstPart)){
      firstPart = hexDict[firstPart];
    }

    if (charIsLetter(lastPart)){
      lastPart = hexDict[lastPart];
    }

    nMatrix[x] = box[firstPart][lastPart];
  }
  return nMatrix;
}

function rotWord(matrix,shift){ //shifts row of column by a certain amount
  let nMatrix = []
  for(let x = 0;x<matrix.length;x++){
    nMatrix[x] = matrix[x]; //clone matrix to make sure it doesn't shift the original
  }
  for(let x = 0;x<shift;x++){
    let first = nMatrix.shift();
    nMatrix.push(first);
  }
  return nMatrix;
}

function rotate(matrix){
  let rotatedMatrix = [ [], [], [], [] ]
  for (let x = 0;x<matrix.length;x++){
    for (let y = 0;y<matrix.length;y++){
      rotatedMatrix[x][y] = matrix[y][x];
    }
  }
  return rotatedMatrix;
}

function mixColumns(matrix){ //uses Rijndael Galois Field to modulo multiply the column
  let nMatrix = []
  console.log(matrix);
  for(let x = 0;x<matrix.length;x++){
    nMatrix[x] = matrix[x]; //clone matrix to make sure it doesn't change original
  }
  /*matrix[0] = dot([nMatrix[0]],[galoisField[0][0]]) ^ dot([nMatrix[1]],[galoisField[0][1]]) ^ dot([nMatrix[2]],[galoisField[0][2]]) ^ dot([nMatrix[3]],[galoisField[0][3]]);
  matrix[1] = dot(nMatrix[0],galoisField[1][0]) ^ dot(nMatrix[1],galoisField[1][1]) ^ dot(nMatrix[2],galoisField[1][2]) ^ dot(nMatrix[3],galoisField[1][3]);
  matrix[2] = dot(nMatrix[0],galoisField[2][0]) ^ dot(nMatrix[1],galoisField[2][1]) ^ dot(nMatrix[2],galoisField[2][2]) ^ dot(nMatrix[3],galoisField[2][3]);
  matrix[3] = dot(nMatrix[0],galoisField[3][0]) ^ dot(nMatrix[1],galoisField[3][1]) ^ dot(nMatrix[2],galoisField[3][2]) ^ dot(nMatrix[3],galoisField[3][3]);*/

}

function keySchedule(matrix,round){
  const oldMatrix = matrix;
  const newMatrix = [ [],[],[],[] ];

  newMatrix[0] = rotWord(oldMatrix[3],1);
  newMatrix[0] = subBytes(newMatrix[0]);
  newMatrix[0] = keyScheduleRoundKey(oldMatrix[0],newMatrix[0],RCON[round]);

  newMatrix[1] = addRoundKey(oldMatrix[1],newMatrix[0]);
  newMatrix[2] = addRoundKey(oldMatrix[2],newMatrix[1]);
  newMatrix[3] = addRoundKey(oldMatrix[3],newMatrix[2]);

  //console.log("Before:" + oldMatrix);
  //console.log("After:" + newMatrix);

  return newMatrix;
}

function initiateRound(matrix,roundKey){

  for(let step = 0;step<matrix.length;step++){
    matrix[step] = subBytes(matrix[step]) //substitutes based on s-box
  }

  //flip the matrix so column turns to row
  let rotatedMatrix = rotate(matrix);
  for(let step = 0;step<matrix.length;step++){ //kept separate from substitution since gotta deal with rows now
    rotatedMatrix[step] = rotWord(rotatedMatrix[step],step)
  }
  matrix = rotate(rotatedMatrix)

  for(let step = 0;step<matrix.length;step++){ //kept separate from substitution since gotta deal with rows now
    //mixColumns(matrix[step]);
  }
  //console.log(matrix);

  matrix = addRoundKey2(matrix,roundKey);

}

export default {box, create4X4, keySchedule, decimalToHex, initiateRound, addRoundKey2}
