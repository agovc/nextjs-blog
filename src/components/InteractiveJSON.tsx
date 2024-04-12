import { useState } from "react";

interface Node {
  [key: string]:
    | Node
    | string
    | number
    | boolean
    | null
    | Array<Node | string | number | boolean | null>;
}

interface TreeNodeProps {
  node?: Node | null;
  depth: number;
}

const TreeNode = (props: TreeNodeProps) => {
  const { node, depth } = props;
  const currentNode = node as Node;
  const [isCollapsed, setIsCollapsed] = useState(depth !== 0);

  const renderNode = (node: Node) => {
    if (typeof node === "object" && node != null) {
      const isArray = Array.isArray(node);
      return (
        <div className="ml-8">
          <button
            onClick={() => setIsCollapsed((prev) => !prev)}
            className="font-mono text-sm hover:text-blue-600"
          >
            {isCollapsed ? "🔼" : "🔽"} {isArray ? "Array" : "Object"}
          </button>
          {isArray ? " [ " : " { "}
          {!isCollapsed ? (
            <div>
              {Object.entries(node).map(([key, value]) => {
                return (
                  <div key={key} className="ml-8">
                    <span className="font-semibold">{key}:</span>{" "}
                    {value !== null && (
                      <TreeNode node={value as Node} depth={depth + 1} />
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            "..."
          )}
          {isArray ? " ] " : " } "}
        </div>
      );
    } else {
      return <span>{JSON.stringify(node)}</span>;
    }
  };

  return renderNode(currentNode);
};

function JSONExample() {
  const jsonData: Node = {
    name: "John",
    age: 30,
    address: {
      street: "123 Main St",
      city: "Anytown",
      zip: "12345",
    },
    children: [
      {
        name: "Alice",
        age: 5,
        toys: ["doll", "blocks"],
      },
      {
        name: "Bob",
        age: 8,
        toys: ["car", "train"],
      },
    ],
    pets: [
      {
        type: "dog",
        name: "Rex",
      },
      {
        type: "cat",
        name: "Whiskers",
      },
    ],
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 rounded-2xl p-8 border border-slate-200">
      <TreeNode node={jsonData} depth={0} />
    </div>
  );
}

export default JSONExample;
