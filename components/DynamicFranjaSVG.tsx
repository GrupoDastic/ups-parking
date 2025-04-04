import {SvgXml} from "react-native-svg";

interface DynamicFranjaSVGProps {
    svgContent: string;
    width: number;
    height: number;
    viewBox: string;
}

const DynamicFranjaSVG = ({ svgContent, width, height, viewBox }: DynamicFranjaSVGProps) => {
    const xml = `<svg width="${width}" height="${height}" viewBox="${viewBox}" xmlns="http://www.w3.org/2000/svg">${svgContent}</svg>`;
    return <SvgXml xml={xml} width={width} height={height} />;
};

export default DynamicFranjaSVG;
