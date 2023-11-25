"use client";

import React, { FC, useState } from "react";

type RiscVInstruction = {
  name: string;
  description: string;
  format: string;
  implementation: string;
  module: string;
};

const useSearch = (searchText: string): RiscVInstruction[] => {
  if (searchText === "") {
    return InstructionList;
  }

  const search = (text: string) =>
    text.toUpperCase().includes(searchText.toUpperCase());

  return InstructionList.filter((instruction) => {
    return (
      search(instruction.name) ||
      search(instruction.description) ||
      search(instruction.format) ||
      search(instruction.implementation) ||
      search(instruction.module)
    );
  });
};

export default function Home() {
  const [searchText, setSearchText] = useState("");

  const searchResults = useSearch(searchText);

  return (
    <Container>
      <Header />

      <SearchBox searchText={searchText} setSearchText={setSearchText} />
      <SearchResults searchResults={searchResults} />
    </Container>
  );
}

const Header = () => {
  return (
    <HeaderContainer>
      <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-4 items-end">
          <Title>FZR-V</Title>
          <Caption>Fuzzy Search RISC-V instructions</Caption>
        </div>
        <p>Currently this just looks to see if it contains the word.</p>
      </div>
    </HeaderContainer>
  );
};

type SearchBoxProps = {
  searchText: string;
  setSearchText: (searchText: string) => void;
};

const SearchBox: React.FC<SearchBoxProps> = ({ searchText, setSearchText }) => {
  return (
    <form>
      <input
        className={InputStyle}
        type="text"
        placeholder="Enter your search query..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
    </form>
  );
};

type SearchResultsProps = {
  searchResults: RiscVInstruction[];
};

const SearchResults: FC<SearchResultsProps> = ({ searchResults }) => {
  return (
    <ListContainer>
      {searchResults.map((result) => (
        <ListItem key={result.name}>
          <LeftHeader>
            <h2 className="text-xl font-bold">{result.name}</h2>
            <p className="text-gray-700">{result.description}</p>
            <p className="text-gray-700">{result.module}</p>
          </LeftHeader>
          <RightContent>
            <p className="text-gray-700">{result.format}</p>
            <p className="text-gray-700">{result.implementation}</p>
          </RightContent>
        </ListItem>
      ))}
    </ListContainer>
  );
};

type Wrapper = FC<{
  children: React.ReactNode;
}>;

const ListContainer: Wrapper = ({ children }) => (
  <div
    className={`
    flex
    flex-col
    gap-4
  `}
  >
    {children}
  </div>
);

const ListItem: Wrapper = ({ children }) => (
  // クリックアクションを追加しだしたらこれらのスタイルを使う
  // hover:border-gray-400
  // focus-within:ring-2
  // focus-within:ring-blue-500
  // focus-within:border-transparent
  <div
    className={`
    grid
    grid-cols-2
    items-end

    gap-4
    p-4

    border-b
    border-gray-300

  `}
  >
    {children}
  </div>
);

const LeftHeader: Wrapper = ({ children }) => (
  <div
    className={`
    flex
    flex-col
    gap-2
  `}
  >
    {children}
  </div>
);

const RightContent: Wrapper = ({ children }) => (
  <div
    className={`
    flex
    flex-col
    gap-2
  `}
  >
    {children}
  </div>
);

const Container: Wrapper = ({ children }) => {
  return (
    <div
      className={`
  container
  mx-auto
  p-8
  pt-8

  flex
  flex-col
  gap-8
  `}
    >
      {children}
    </div>
  );
};

const Title: Wrapper = ({ children }) => (
  <h1
    className={`
    text-3xl
    font-bold
    text-gray-700

    break-normal
`}
  >
    {children}
  </h1>
);

const Caption: Wrapper = ({ children }) => (
  <p
    className={`
    text-xl
    text-gray-700

    break-word
    `}
  >
    {children}
  </p>
);

const HeaderContainer: Wrapper = ({ children }) => (
  <header
    className={`
      flex
      flex-row
      items-end
      gap-4
    `}
  >
    {children}
  </header>
);

const InputStyle = `
  w-full
  p-4
  rounded
  border
  border-gray-300
  focus:outline-none
  focus:ring-2
  focus:ring-blue-500
  focus:border-transparent
`;

const InstructionList: RiscVInstruction[] = [
  {
    name: "add",
    description: "Add",
    format: "ADD rd, rs1, rs2",
    implementation: "x[rd] = x[rs1] + x[rs2]",
    module: "RV32I, RV64I",
  },
  {
    name: "addi",
    description: "Add immediate",
    format: "ADDI rd, rs1, imm",
    implementation: "x[rd] = x[rs1] + sext(immediate)",
    module: "RV32I, RV64I",
  },
  {
    name: "addiw",
    description: "Add immediate word",
    format: "addiw rd, rs1, imm",
    implementation: "x[rd] = sext((x[rs1] + sext(immediate))[31:0])",
    module: "RV64I",
  },
  {
    name: "addw",
    description: "Add word",
    format: "addw rd, rs1, rs2",
    implementation: "x[rd] = sext((x[rs1] + x[rs2])[31:0])",
    module: "RV64I",
  },
  {
    name: "and",
    description: "AND",
    format: "and rd, rs1, rs2",
    implementation: "x[rd] = x[rs1] & x[rs2]",
    module: "RV32I, RV64I",
  },
  {
    name: "andi",
    description: "AND immediate",
    format: "andi rd, rs1, imm",
    implementation: "x[rd] = x[rs1] & sext(immediate)",
    module: "RV32I, RV64I",
  },
  {
    name: "auipc",
    description: "Add upper immediate to PC",
    format: "auipc rd, imm",
    implementation: "x[rd] = pc + sext(immediate)",
    module: "RV32I, RV64I",
  },
  {
    name: "beq",
    description: "Branch if Equal",
    format: "beq rs1, rs2, offset",
    implementation: "if(rs1 == rs2) pc += sext(offset)",
    module: "RV32I, RV64I",
  },
  {
    name: "bgqz",
    description: "Branch if Equal to Zero",
    format: "bgqz rs1, offset",
    implementation: "if(rs1 == 0) pc += sext(offset)",
    module: "RV32I, RV64I",
  },
  {
    name: "bge",
    description: "Branch if greater than or equal",
    format: "bge rs1, rs2, offset",
    implementation: "if(rs1 >= rs2) pc += sext(offset)",
    module: "RV32I, RV64I",
  },
  {
    name: "bgeu",
    description: "Branch if greater than or equal, unsigned",
    format: "bgeu rs1, rs2, offset",
    implementation: "if(rs1 >= rs2) pc += sext(offset)",
    module: "RV32I, RV64I",
  },
  {
    name: "bgez",
    description: "Branch if greater than or equal to zero",
    format: "bgez rs1, offset",
    implementation: "if(rs1 >= 0) pc += sext(offset)",
    module: "RV32I, RV64I",
  },
  {
    name: "bgt",
    description: "Branch if greater than",
    format: "bgt rs1, rs2, offset",
    implementation: "if(rs1 > rs2) pc += sext(offset)",
    module: "RV32I, RV64I",
  },
  {
    name: "bgtu",
    description: "Branch if greater than, unsigned",
    format: "bgtu rs1, rs2, offset",
    implementation: "if(rs1 > rs2) pc += sext(offset)",
    module: "RV32I, RV64I",
  },
  {
    name: "bgtz",
    description: "Branch if greater than zero",
    format: "bgtz rs1, offset",
    implementation: "if(rs1 > 0) pc += sext(offset)",
    module: "RV32I, RV64I",
  },
  {
    name: "ble",
    description: "Branch if less than or equal",
    format: "ble rs1, rs2, offset",
    implementation: "if(rs1 <= rs2) pc += sext(offset)",
    module: "RV32I, RV64I",
  },
  {
    name: "bleu",
    description: "Branch if less than or equal, unsigned",
    format: "bleu rs1, rs2, offset",
    implementation: "if(rs1 <= rs2) pc += sext(offset)",
    module: "RV32I, RV64I",
  },
  {
    name: "blez",
    description: "Branch if less than or equal to zero",
    format: "blez rs1, offset",
    implementation: "if(rs1 <= 0) pc += sext(offset)",
    module: "RV32I, RV64I",
  },
  {
    name: "blt",
    description: "Branch if less than (signed)",
    format: "blt rs1, rs2, offset",
    implementation: "if(rs1 < rs2) pc += sext(offset)",
    module: "RV32I, RV64I",
  },
  {
    name: "bltu",
    description: "Branch if less than (unsigned)",
    format: "bltu rs1, rs2, offset",
    implementation: "if(rs1 < rs2) pc += sext(offset)",
    module: "RV32I, RV64I",
  },
  {
    name: "bltz",
    description: "Branch if less than zero",
    format: "bltz rs1, offset",
    implementation: "if(rs1 < 0) pc += sext(offset)",
    module: "RV32I, RV64I",
  },
  {
    name: "bne",
    description: "Branch if not equal",
    format: "bne rs1, rs2, offset",
    implementation: "if(rs1 != rs2) pc += sext(offset)",
    module: "RV32I, RV64I",
  },
  {
    name: "bnez",
    description: "Branch if not equal to zero",
    format: "bnez rs1, offset",
    implementation: "if(rs1 != 0) pc += sext(offset)",
    module: "RV32I, RV64I",
  },
  {
    name: "call",
    description: "Call",
    format: "call rd, symbol",
    implementation: "x[rd] = pc + 8; pc = symbol",
    module: "RV32I, RV64I",
  },
  {
    name: "csrr",
    description: "Control and Status Register Read",
    format: "csrr rd, csr",
    implementation: "x[rd] = CSRs[csr]",
    module: "RV32I, RV64I",
  },
  {
    name: "csrc",
    description: "Control and Status Register Clear",
    format: "csrc csr, rs",
    implementation: "CSRs[csr] &= ~x[rs]",
    module: "RV32I, RV64I",
  },
  {
    name: "csrci",
    description: "Control and Status Register Clear Immediate",
    format: "csrci csr, zimm[4:0]",
    implementation: "CSRs[csr] &= ~zimm",
    module: "RV32I, RV64I",
  },
  {
    name: "csrrc",
    description: "Control and Status Register Read and Clear",
    format: "csrrc rd, csr, rs",
    implementation: "t = CSRs[csr]; CSRs[csr] &= ~x[rs]; x[rd] = t",
    module: "RV32I, RV64I",
  },
  {
    name: "csrrci",
    description: "Control and Status Register Read and Clear Immediate",
    format: "csrrci rd, csr, zimm[4:0]",
    implementation: "t = CSRs[csr]; CSRs[csr] &= ~zimm; x[rd] = t",
    module: "RV32I, RV64I",
  },
  {
    name: "csrrs",
    description: "Control and Status Register Read and Set",
    format: "csrrs rd, csr, rs",
    implementation: "t = CSRs[csr]; CSRs[csr] |= x[rs]; x[rd] = t",
    module: "RV32I, RV64I",
  },
  {
    name: "csrrsi",
    description: "Control and Status Register Read and Set Immediate",
    format: "csrrsi rd, csr, zimm[4:0]",
    implementation: "t = CSRs[csr]; CSRs[csr] |= zimm; x[rd] = t",
    module: "RV32I, RV64I",
  },
  {
    name: "csrrw",
    description: "Control and Status Register Read and Write",
    format: "csrrw rd, csr, rs",
    implementation: "t = CSRs[csr]; CSRs[csr] = x[rs]; x[rd] = t",
    module: "RV32I, RV64I",
  },
  {
    name: "csrrwi",
    description: "Control and Status Register Read and Write Immediate",
    format: "csrrwi rd, csr, zimm[4:0]",
    implementation: "t = CSRs[csr]; CSRs[csr] = zimm; x[rd] = t",
    module: "RV32I, RV64I",
  },
  {
    name: "csrs",
    description: "Control and Status Register Set",
    format: "csrs csr, rs",
    implementation: "CSRs[csr] |= x[rs]",
    module: "RV32I, RV64I",
  },
  {
    name: "csrsi",
    description: "Control and Status Register Set Immediate",
    format: "csrsi csr, zimm[4:0]",
    implementation: "CSRs[csr] |= zimm",
    module: "RV32I, RV64I",
  },
  {
    name: "csrw",
    description: "Control and Status Register Write",
    format: "csrw csr, rs",
    implementation: "CSRs[csr] = x[rs]",
    module: "RV32I, RV64I",
  },
  {
    name: "csrwi",
    description: "Control and Status Register Write Immediate",
    format: "csrwi csr, zimm[4:0]",
    implementation: "CSRs[csr] = zimm",
    module: "RV32I, RV64I",
  },
  {
    name: "div",
    description: "Divide",
    format: "div rd, rs1, rs2",
    implementation: "x[rd] = x[rs1] / x[rs2]",
    module: "RV32M, RV64M",
  },
  {
    name: "divu",
    description: "Divide, unsigned",
    format: "divu rd, rs1, rs2",
    implementation: "x[rd] = x[rs1] / x[rs2]",
    module: "RV32M, RV64M",
  },
  {
    name: "divuw",
    description: "Divide, unsigned word",
    format: "divuw rd, rs1, rs2",
    implementation: "x[rd] = sext((x[rs1][31:0] / x[rs2])[31:0])",
    module: "RV64M",
  },
  {
    name: "divw",
    description: "Divide word",
    format: "divw rd, rs1, rs2",
    implementation: "x[rd] = sext((x[rs1][31:0] / x[rs2])[31:0])",
    module: "RV64M",
  },
  {
    name: "ebreak",
    description: "Environment break",
    format: "ebreak",
    implementation: "raise_exception(BREAKPOINT)",
    module: "RV32I, RV64I",
  },
  {
    name: "ecall",
    description: "Environment call",
    format: "ecall",
    implementation: "raise_exception(ECALL)",
    module: "RV32I, RV64I",
  },
  {
    name: "fence",
    description: "Fence Memory and I/O",
    format: "fence pred, succ",
    implementation: "Fence(pred, succ)",
    module: "RV32I, RV64I",
  },
  {
    name: "j",
    description: "Jump",
    format: "j offset",
    implementation: "pc += sext(offset)",
    module: "RV32I, RV64I",
  },
  {
    name: "jal",
    description: "Jump and link",
    format: "jal rd, offset",
    implementation: "x[rd] = pc + 4; pc += sext(offset)",
    module: "RV32I, RV64I",
  },
  {
    name: "jr",
    description: "Jump register",
    format: "jr rs",
    implementation: "pc = x[rs]",
    module: "RV32I, RV64I",
  },
  {
    name: "la",
    description: "Load address",
    format: "la rd, symbol",
    implementation: "x[rd] = symbol",
    module: "RV32I, RV64I",
  },
  {
    name: "lb",
    description: "Load byte",
    format: "lb rd, offset(rs1)",
    implementation: "x[rd] = sext(M[x[rs1] + sext(offset)][7:0])",
    module: "RV32I, RV64I",
  },
  {
    name: "ld",
    description: "Load doubleword",
    format: "ld rd, offset(rs1)",
    implementation: "x[rd] = M[x[rs1] + sext(offset)][63:0]",
    module: "RV64I",
  },
  {
    name: "lh",
    description: "Load halfword",
    format: "lh rd, offset(rs1)",
    implementation: "x[rd] = sext(M[x[rs1] + sext(offset)][15:0])",
    module: "RV32I, RV64I",
  },
  {
    name: "li",
    description: "Load immediate",
    format: "li rd, imm",
    implementation: "x[rd] = sext(immediate)",
    module: "RV32I, RV64I",
  },
  {
    name: "lw",
    description: "Load word",
    format: "lw rd, offset(rs1)",
    implementation: "x[rd] = sext(M[x[rs1] + sext(offset)][31:0])",
    module: "RV32I, RV64I",
  },
  {
    name: "mret",
    description: "Machine return",
    format: "mret",
    implementation: "ExceptionReturn(MachineMode)",
    module: "RV32I, RV64I",
  },
  {
    name: "mul",
    description: "Multiply",
    format: "mul rd, rs1, rs2",
    implementation: "x[rd] = x[rs1] * x[rs2]",
    module: "RV32M, RV64M",
  },
  {
    name: "mv",
    description: "Move",
    format: "mv rd, rs",
    implementation: "x[rd] = x[rs]",
    module: "RV32I, RV64I",
  },
  {
    name: "neg",
    description: "Negate",
    format: "neg rd, rs",
    implementation: "x[rd] = -x[rs]",
    module: "RV32I, RV64I",
  },
  {
    name: "nop",
    description: "No operation",
    format: "nop",
    implementation: "Nothing",
    module: "RV32I, RV64I",
  },
  {
    name: "not",
    description: "NOT",
    format: "not rd, rs",
    implementation: "x[rd] = ~x[rs]",
    module: "RV32I, RV64I",
  },
  {
    name: "or",
    description: "OR",
    format: "or rd, rs1, rs2",
    implementation: "x[rd] = x[rs1] | x[rs2]",
    module: "RV32I, RV64I",
  },
  {
    name: "ori",
    description: "OR immediate",
    format: "ori rd, rs1, imm",
    implementation: "x[rd] = x[rs1] | sext(immediate)",
    module: "RV32I, RV64I",
  },
  {
    name: "rem",
    description: "Remainder",
    format: "rem rd, rs1, rs2",
    implementation: "x[rd] = x[rs1] % x[rs2]",
    module: "RV32M, RV64M",
  },
  {
    name: "ret",
    description: "Return",
    format: "ret",
    implementation: "pc = x[1]",
    module: "RV32I, RV64I",
  },
  {
    name: "sb",
    description: "Store byte",
    format: "sb rs2, offset(rs1)",
    implementation: "M[x[rs1] + sext(offset)] = x[rs2][7:0]",
    module: "RV32I, RV64I",
  },
  {
    name: "sd",
    description: "Store doubleword",
    format: "sd rs2, offset(rs1)",
    implementation: "M[x[rs1] + sext(offset)] = x[rs2][63:0]",
    module: "RV64I",
  },
  {
    name: "seqz",
    description: "Set if equal to zero",
    format: "seqz rd, rs",
    implementation: "x[rd] = (x[rs] == 0)",
    module: "RV32I, RV64I",
  },
  {
    name: "sgtz",
    description: "Set if greater than zero",
    format: "sgtz rd, rs",
    implementation: "x[rd] = (x[rs] > 0)",
    module: "RV32I, RV64I",
  },
  {
    name: "sh",
    description: "Store halfword",
    format: "sh rs2, offset(rs1)",
    implementation: "M[x[rs1] + sext(offset)] = x[rs2][15:0]",
    module: "RV32I, RV64I",
  },
  {
    name: "sw",
    description: "Store word",
    format: "sw rs2, offset(rs1)",
    implementation: "M[x[rs1] + sext(offset)] = x[rs2][31:0]",
    module: "RV32I, RV64I",
  },
  {
    name: "sll",
    description: "Shift left logical",
    format: "sll rd, rs1, rs2",
    implementation: "x[rd] = x[rs1] << x[rs2]",
    module: "RV32I, RV64I",
  },
  {
    name: "slli",
    description: "Shift left logical immediate",
    format: "slli rd, rs1, shamt",
    implementation: "x[rd] = x[rs1] << shamt",
    module: "RV32I, RV64I",
  },
  {
    name: "sret",
    description: "Supervisor return",
    format: "sret",
    implementation: "ExceptionReturn(SupervisorMode)",
    module: "RV32I, RV64I",
  },
  {
    name: "sub",
    description: "Subtract",
    format: "sub rd, rs1, rs2",
    implementation: "x[rd] = x[rs1] - x[rs2]",
    module: "RV32I, RV64I",
  },
  {
    name: "subw",
    description: "Subtract word",
    format: "subw rd, rs1, rs2",
    implementation: "x[rd] = sext((x[rs1] - x[rs2])[31:0])",
    module: "RV64I",
  },
  {
    name: "tail",
    description: "Tail",
    format: "tail symbol",
    implementation: "pc = &symbol; clobber x[6]",
    module: "RV32I, RV64I",
  },
  {
    name: "wfi",
    description: "Wait for interrupt",
    format: "wfi",
    implementation: "while (no_interrupt) idle",
    module: "RV32I, RV64I",
  },
  {
    name: "xor",
    description: "XOR",
    format: "xor rd, rs1, rs2",
    implementation: "x[rd] = x[rs1] ^ x[rs2]",
    module: "RV32I, RV64I",
  },
  {
    name: "xori",
    description: "XOR immediate",
    format: "xori rd, rs1, imm",
    implementation: "x[rd] = x[rs1] ^ sext(immediate)",
    module: "RV32I, RV64I",
  },
];
