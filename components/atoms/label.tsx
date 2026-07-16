
type TLabel = {
    htmlFor: string;
    text: string;
}

export const Label = ({
    htmlFor,
    text,
}: TLabel) => (
    <label htmlFor={htmlFor}>
        { text }
    </label>
)