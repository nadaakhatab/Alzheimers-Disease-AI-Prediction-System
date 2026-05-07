// front/src/utils/validation.ts
export const validateClinicalDemographic = (data: any): string[] => {
    const errors: string[] = [];

    if (!data.CDGLOBAL || data.CDGLOBAL === "" || isNaN(Number(data.CDGLOBAL)))
        errors.push("• CDGLOBAL مطلوب ورقم (مثال: 0, 0.5, 1)");

    if (
        !data.Age ||
        data.Age === "" ||
        Number(data.Age) < 50 ||
        Number(data.Age) > 100
    )
        errors.push("• العمر من 50 إلى 100 سنة");

    if (!data.PTGENDER) errors.push("• لازم تختار الجنس");

    return errors;
};

export const validateGeneticImaging = (data: any): string[] => {
    const errors: string[] = [];

    if (!data.APGEN1 || !["3", "4"].includes(data.APGEN1))
        errors.push("• APGEN1 لازم يكون 3 أو 4");

    if (!data.APGEN2 || !["3", "4"].includes(data.APGEN2))
        errors.push("• APGEN2 لازم يكون 3 أو 4");

    const imagingFields = ["RCT392", "RCT6", "RCT20", "HMT3", "HMT40"];
    imagingFields.forEach((field) => {
        if (!data[field] || data[field] === "" || isNaN(Number(data[field])))
            errors.push(`• ${field} مطلوب ورقم`);
    });

    return errors;
};
