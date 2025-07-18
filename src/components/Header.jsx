export default function Header({title}) {
    const styles = {
        header: {
            textAlign: "center",
            color: "#5D5E61",
            fontSize: "24px", 
            fontWeight: "500", 
            marginBottom: "20px",
        },
    };
    return (
        <p style={styles.header}>{title}</p>
    );
};