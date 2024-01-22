
export default function InputCustomFile({ label, onChange, errorMessage, isInvalid, name, className }) {

    const Styled = {
        container: {
            borderRadius: "20px",
            paddingLeft: "12px",
            paddingTop: "15px",
            paddingBottom: "15px",
        },
        inputStyle: {
            backgroundColor: "transparent",
            border: "0px",
            width: "100%",
        },
        errorMsg:{
            marginLeft: "15px"
        }
    }

    return (
        <>
            {
                (isInvalid) ?
                    (errorMessage != "") ?
                        <>
                            <div style={Styled.container} data-slot="input-wrapper" className={"bg-danger-50 hover:bg-danger-50 focus:bg-danger-50"}>
                                <div>
                                    <label className="text-danger">{label}</label>
                                </div>
                                <div>
                                    <input type="file" onChange={onChange} name={name} style={Styled.inputStyle} className="text-danger"/>
                                </div>
                            </div>
                            <div className="text-tiny text-danger" style={Styled.errorMsg}>{errorMessage}</div>
                        </>
                        :
                        <div style={Styled.container} data-slot="input-wrapper" className={"bg-default-100 hover:bg-default-200 focus:bg-default-200"}>
                            <div>
                                <label className="text-foreground-500">{label}</label>
                            </div>
                            <div>
                                <input type="file" onChange={onChange} name={name} style={Styled.inputStyle} className="text-foreground-500" />
                            </div>
                        </div>
                    :
                    <div style={Styled.container} data-slot="input-wrapper" className={"bg-default-100 hover:bg-default-200 focus:bg-default-200"}>
                        <div>
                            <label className="text-foreground-500">{label}</label>
                        </div>
                        <div>
                            <input type="file" onChange={onChange} name={name} style={Styled.inputStyle} className="text-foreground-500" />
                        </div>
                    </div>
            }
        </>

    );
}