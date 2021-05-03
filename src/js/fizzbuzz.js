function fizzbuzz(num) {
  document.getElementById("result").innerHTML = "" // clear the paragraph first
  for (let i = num; i > 0; i--) {
    if (i % 3 === 0 && i % 5 === 0) {
      append('FizzBuzz');
    } else if (i % 3 === 0) {
      append('Fizz');
    } else if (i % 5 === 0) {
      append('Buzz');
    } else {
      append(i);
    }
  }
}

function append(textToAppend) {
  let paragraph = document.getElementById("result"); // get the paragraph
  let text = document.createTextNode("// " + textToAppend); // get the text to append to the paragraph
  let linebreak = document.createElement("br"); // create a linebreak to append
  paragraph.appendChild(text); // append text
  paragraph.appendChild(linebreak); // append linebreak
}
