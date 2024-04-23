---
id: complex-data
title: "Elevating Complex Data Visualization: A Journey from Interactive JSON to Interactive Tables"
description: "Explore the journey of rendering complex data structures interactively in React, from crafting an interactive JSON component to extending the concept to interactive tables, overcoming challenges in state management and user experience."
isPublished: true
date: "2024-04-12"
image: "/images/thumbnails/complex-data.webp"
---

The quest for rendering complex data in a user-friendly and visually appealing manner led me on a journey from crafting an interactive JSON component to extending the concept to interactive tables. In this blog post, I'll share insights into the development process, challenges encountered, and solutions explored along the way.

# Interactive JSON Component

My exploration began with the ambition to create an interactive JSON component capable of elegantly presenting nested structures akin to a tree. Using React, I devised a recursive rendering mechanism for tree nodes, enabling seamless navigation and interaction.

<JSONExample />

An important aspect of the component is its behavior upon initial render: it displays only the first level of the JSON structure expanded. To achieve this, I employed a `depth` prop, which ensures the expansion of the first `TreeNode`. However, it's worth noting that there are opportunities for improvement, particularly regarding state management.

Currently, the state resides at the component level. Consequently, collapsing a node and subsequently unmounting the component results in the loss of state. This presents a clear challenge, but there are multiple strategies available to address this issue. In the upcoming example, I'll delve into these strategies and explore their effectiveness in ensuring seamless state preservation.

<CodeBlock code={`
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
`} language="tsx" />

# Extending the Concept: Interactive Tables

Inspired by the interactive JSON component, I envisioned leveraging similar principles to enhance data visualization within tables. Complex datasets often find their home in tabular formats, making tables a natural candidate for accommodating tree-like structures with collapsible rows.

<CollapsableTableExample />

In this adaptation, the focus shifted from rendering tree nodes to managing collapsible rows within the table structure. By centralizing state management at the parent component level, I ensured greater cohesion and scalability, facilitating a more manageable codebase. Lifting the state management to the parent component level offers a significant advantage: it enables the preservation of state even when rows are collapsed. Additionally, when toggling between collapsed and expanded states, the persisted state remains intact, providing a seamless user experience and enhancing overall functionality.

**NOTE:** For this example I am using a `Table` component that has some basic styling.

<CodeBlock code={`
    const Row = (props: RowProps) => {
        const { data, depth, openRows, onToggle } = props;
        const isOpen = openRows[data.id] || false;
        const hasChildren = data.children.length > 0;

        return (
            <>
                <TableRow>
                    <TableCell>
                    <div className={"flex pl-8"}>
                        <div className="w-8 flex items-center">
                        {hasChildren && (
                            <button onClick={() => onToggle(data.id)}>
                            {isOpen ? <ChevronDown /> : <ChevronRight />}
                            </button>
                        )}
                        </div>
                        <div>
                            <div className="font-semibold">{data.name}</div>
                            <div>{data.role}</div>
                        </div>
                    </div>
                    </TableCell>
                    <TableCell>{data.newBusinessQuota}</TableCell>
                    <TableCell>{data.booked}</TableCell>
                </TableRow>
                {isOpen &&
                    hasChildren &&
                    data.children.map((child) => (
                    <Row
                        key={child.id}
                        data={child}
                        openRows={openRows}
                        onToggle={onToggle}
                        depth={depth + 1}
                    />
                ))}
            </>
        );
    };
`} language="tsx" />

<CodeBlock code={`
    const CollapsableTable = (props: TableProps) => {
        const { rows } = props;
        const [openRows, setOpenRows] = useState<{ [key: number]: boolean }>({});

        const handleToggle = (id: number) => {
            setOpenRows((prevOpenRows) => ({
                ...prevOpenRows,
                [id]: !prevOpenRows[id],
            }));
        };

        return (
            <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead scope="col">Name</TableHead>
                    <TableHead scope="col">New Business Quota</TableHead>
                    <TableHead scope="col">Booked</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {rows.map((row) => (
                    <Row
                        key={row.id}
                        data={row}
                        openRows={openRows}
                        onToggle={handleToggle}
                        depth={0}
                    />
                    ))}
                </TableBody>
            </Table>
        );
    };
`} language="tsx" />


## Empowering User Experience through Data Visualization

In conclusion, the journey from interactive JSON components to interactive tables exemplifies the power of innovative data visualization techniques in enhancing user experience. By prioritizing clarity, interactivity, and manageability, we can transform complex data into intuitive insights, ultimately delivering unparalleled value to users.