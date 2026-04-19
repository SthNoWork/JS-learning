class Table {
  constructor() {
    this.rows = [];
  }

  addRow(...cells) {
    this.rows.push(cells.map(String));
  }

  print() {
    if (this.rows.length === 0) return;

    const widths = this.rows[0].map((_, col) =>
      Math.max(...this.rows.map((row) => row[col].length)),
    );

    const border = "+" + widths.map((w) => "-".repeat(w + 2)).join("+") + "+";

    this.rows.forEach((row, i) => {
      const line =
        "| " + row.map((cell, c) => cell.padEnd(widths[c])).join(" | ") + " |";
      console.log(line);

      if (i === 0 || i === this.rows.length - 1) {
        console.log(border);
      }
    });
  }
}

function printMultiplicationTable() {
  const table = new Table();
  table.addRow(" ", ...Array.from({ length: 10 }, (_, i) => i + 1));

  for (let r = 1; r <= 5; r++) {
    table.addRow(`${r}|`, ...Array.from({ length: 10 }, (_, c) => r * (c + 1)));
  }

  table.print();
}

function printPeopleTable() {
  const table = new Table();
  table.addRow("Country", "Name", "Profession", "Age");

  const people = [
    { country: "Germany", name: "Michael", job: "Computer Engineer", age: 19 },
    { country: "England", name: "Robert", job: "Artist", age: 34 },
    { country: "United Kingdom", name: "Julia", job: "Designer", age: 42 },
    { country: "United States", name: "Jo", job: "Actor", age: 21 },
  ];

  people.forEach(({ country, name, job, age }) => {
    table.addRow(country, name, job, age);
  });

  table.print();
}

printMultiplicationTable();
printPeopleTable();
