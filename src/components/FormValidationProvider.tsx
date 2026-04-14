"use client";
import { useEffect } from "react";

const ERROR_ATTR = "data-validation-error";

function setErrorMessage(input, message) {
  let existing = input.nextElementSibling;
  if (existing && existing.getAttribute && existing.getAttribute(ERROR_ATTR) === "true") {
    existing.textContent = message;
    existing.style.display = message ? "block" : "none";
    return;
  }

  if (!message) return;

  const errorElem = document.createElement("p");
  errorElem.setAttribute(ERROR_ATTR, "true");
  errorElem.className = "mt-1 text-xs text-red-600";
  errorElem.textContent = message;
  input.parentNode.insertBefore(errorElem, input.nextSibling);
}

function getMessage(input) {
  if (input.validity.valueMissing) return "Ce champ est requis.";
  if (input.validity.typeMismatch) return "Format invalide.";
  if (input.validity.tooShort) return `Veuillez saisir au moins ${input.minLength} caractères.`;
  if (input.validity.tooLong) return `Veuillez saisir au maximum ${input.maxLength} caractères.`;
  if (input.validity.patternMismatch) return "Format invalide.";
  if (input.validity.rangeUnderflow) return `La valeur doit être >= ${input.min}.`;
  if (input.validity.rangeOverflow) return `La valeur doit être <= ${input.max}.`;
  return "";
}

export default function FormValidationProvider() {
  useEffect(() => {
    const handleBlur = (event) => {
      const target = event.target;
      if (!(target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target instanceof HTMLSelectElement)) return;
      const message = getMessage(target);
      setErrorMessage(target, message);
      if (!message) {
        // clear after field
        setErrorMessage(target, "");
      }
    };

    const handleSubmit = (event) => {
      const form = event.target;
      if (!(form instanceof HTMLFormElement)) return;
      let hasError = false;
      const inputs = Array.from(form.querySelectorAll("input, textarea, select"));
      inputs.forEach((input) => {
        if (!(input instanceof HTMLInputElement || input instanceof HTMLTextAreaElement || input instanceof HTMLSelectElement)) return;
        if (!input || input.disabled) return;
        if (!input.checkValidity()) {
          hasError = true;
          const msg = getMessage(input);
          setErrorMessage(input, msg);
        } else {
          setErrorMessage(input, "");
        }
      });

      if (hasError) {
        event.preventDefault();
        const invalid = form.querySelector(":invalid");
        if (invalid && invalid.focus) invalid.focus();
      }
    };

    document.addEventListener("focusout", handleBlur, true);
    document.addEventListener("submit", handleSubmit, true);

    return () => {
      document.removeEventListener("focusout", handleBlur, true);
      document.removeEventListener("submit", handleSubmit, true);
    };
  }, []);

  return null;
}
