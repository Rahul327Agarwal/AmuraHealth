
f = open("Common.tsx", "r", encoding="utf8")
lines = f.readlines()


components = []
for line in lines:
    if line.startswith("export const"):
        components.append(line.split(" ")[2])


# import line
importLine = "import { createElement } from 'react'; import {"
for component in components:
    importLine += component + ", "
importLine = importLine[:-2] + "} from './Common';"


# svg component list

listLine = "const svgComponents: { [key: string]: React.FC<any> }   = {"

for component in components:
    listLine += component + ", "

listLine = listLine[:-2] + "};"


# write the file

f = open("SVGPreview.tsx", "w", encoding="utf8")
f.write(importLine + "\n"
        + listLine + "\n"
        + ''' 

        export default function SVGPreview() {
        return (
            <div
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gridGap: '10px',
                padding: '10px',
            }}
            >
            {Object.keys(svgComponents).map((icon) => (
                <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                >
                {createElement(svgComponents[icon], {
                    title: icon,
                })}
                <div style={{ marginTop: '5px', fontSize: '10px' }}>{icon}</div>
                </div>
            ))}
            </div>
        );
        }

        ''')
f.close()
