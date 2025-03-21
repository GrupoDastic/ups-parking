import {Text, TextProps} from 'react-native';

type TextType =
    'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'subtitle1'
    | 'subtitle2'
    | 'body1'
    | 'body2'
    | 'caption'
    | 'button'
    | 'overline'
    | 'link'
    | 'error';

interface ThemedTextProps extends TextProps {
    className?: string;
    type?: TextType;
}


const ThemedText = ({className, type, children, ...rest}: ThemedTextProps) => {

    return (
        <Text
            className={[
                'color-light-text-primary dark:color-dark-text-primary',
                type === 'h1' && 'text-4xl font-poppins-bold',
                type === 'h2' && 'text-3xl font-poppins-bold',
                type === 'h3' && 'text-2xl font-poppins-bold',
                type === 'h4' && 'text-xl font-poppins-bold',
                type === 'h5' && 'text-lg font-poppins-bold',
                type === 'h6' && 'text-base font-poppins-bold',
                type === 'subtitle1' && 'text-lg font-poppins-medium',
                type === 'subtitle2' && 'text-base font-poppins-medium',
                type === 'body1' && 'text-base font-poppins-regular',
                type === 'body2' && 'text-sm font-poppins-regular',
                type === 'caption' && 'text-xs font-poppins-regular',
                type === 'button' && 'text-base font-poppins-medium',
                type === 'overline' && 'text-xs font-poppins-medium',
                type === 'link' && 'text-base font-poppins-medium underline',
                type === 'error' && 'text-error font-poppins-bold color-light-text-error dark:color-dark-text-error',
                className,
            ].join(' ')}
            {...rest}
        >{children}</Text>
    )
};

export default ThemedText;
