import React, { useState } from 'react';

export default function PasswordChecker({ password }) {
    // Define regex patterns for password constraints
    const lowercasePattern = /[a-z]/;
    const uppercasePattern = /[A-Z]/;
    const digitPattern = /\d/;
    const lengthCheck = /.{8,}/;
    
    // Initialize state for password conditions
    const [hasLowercase, setHasLowercase] = useState(false);
    const [hasUppercase, setHasUppercase] = useState(false);
    const [hasDigit, setHasDigit] = useState(false);
    const [isLongEnough, setIsLongEnough] = useState(false);

    // Check password conditions
    const checkPasswordStrength = (password) => {
        setHasLowercase(lowercasePattern.test(password));
        setHasUppercase(uppercasePattern.test(password));
        setHasDigit(digitPattern.test(password));
        setIsLongEnough(lengthCheck.test(password));
    };

    // Render tick or cross based on password conditions
    const renderCondition = (condition) => {
        return condition ? "✔️" : "❌";
    };

    // Check password strength when password changes
    React.useEffect(() => {
        checkPasswordStrength(password);
    }, [password]);

    // Render password strength indicator
    return (
        <div className='d-flex-col mt-3'>
            <div>{renderCondition(hasLowercase)} Has a lowercase character </div>
            <div>{renderCondition(hasUppercase)} Has an uppercase character</div>
            <div>{renderCondition(hasDigit)} Has at least 1 digit</div>
            <div>{renderCondition(isLongEnough)} Is at least 8 characters long</div>
        </div>
    );
}
