let height = 10;

for (let i = 0; i < height; i++) {
  let spaces = " ".repeat(i);
  let stars = "*".repeat((height - i) * 2 - 1);
  console.log(spaces + stars);
}

let a = 15;
let b = 10;

for (let i = 0; i < b; i++) {
  if (i === 0 || i === b - 1) {
    console.log("*".repeat(a));
  } else {
    console.log("*" + " ".repeat(a - 2) + "*");
  }
}

let size = 5;

for (let row = 0; row < size; row++) {
  let line = "";
  for (let col = 0; col < size; col++) {
    let value = (row + col + 1).toString();
    line += value.padEnd(2);
  }
  console.log(line);
}
