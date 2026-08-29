"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { contactInterests } from "@/lib/platform-content";
import { SELECT_INTEREST_EVENT } from "@/lib/constants";

const DEFAULT_INTEREST = contactInterests[contactInterests.length - 1];

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [interest, setInterest] = useState<string>(DEFAULT_INTEREST);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const fromQuery = params.get("interes");
    if (
      fromQuery &&
      contactInterests.includes(fromQuery as (typeof contactInterests)[number])
    ) {
      setInterest(fromQuery);
      setStatus("idle");
    }
  }, []);

  useEffect(() => {
    const onSelectInterest = (event: Event) => {
      const detail = (event as CustomEvent<string>).detail;
      if (contactInterests.includes(detail as (typeof contactInterests)[number])) {
        setInterest(detail);
        setStatus("idle");
      }
    };

    window.addEventListener(SELECT_INTEREST_EVENT, onSelectInterest);
    return () => window.removeEventListener(SELECT_INTEREST_EVENT, onSelectInterest);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("idle");
    setErrorMessage("");

    const fd = new FormData(e.currentTarget);
    const payload = {
      nombre: fd.get("nombre"),
      email: fd.get("email"),
      empresa: fd.get("empresa"),
      interes: fd.get("interes"),
      mensaje: fd.get("mensaje")
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Ocurrió un error inesperado.");
      }

      setStatus("success");
      (e.target as HTMLFormElement).reset();
      setInterest(DEFAULT_INTEREST);
    } catch (err: unknown) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Error desconocido.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center space-y-3 rounded-2xl border border-primary/20 bg-primary/5 p-6 text-center">
        <CheckCircle2 className="h-12 w-12 text-primary" aria-hidden />
        <h3 className="text-xl font-bold text-foreground">¡Mensaje enviado!</h3>
        <p className="text-muted-foreground">
          Nuestro equipo de ingeniería revisará tu solicitud y se pondrá en contacto pronto.
        </p>
        <Button variant="outline" className="mt-4" onClick={() => setStatus("idle")}>
          Enviar otro mensaje
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full space-y-3"
      data-action="submit-contact"
      data-entity="lead"
    >
      <div className="space-y-2">
        <label htmlFor="contact-nombre" className="text-sm font-medium text-foreground">
          Nombre completo *
        </label>
        <Input
          id="contact-nombre"
          name="nombre"
          required
          placeholder="Ej: Laura Gómez"
          autoComplete="name"
          disabled={isSubmitting}
          maxLength={120}
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="contact-email" className="text-sm font-medium text-foreground">
          Correo corporativo *
        </label>
        <Input
          id="contact-email"
          name="email"
          type="email"
          required
          placeholder="laura@empresa.com"
          autoComplete="email"
          disabled={isSubmitting}
          maxLength={254}
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="contact-empresa" className="text-sm font-medium text-foreground">
          Empresa (opcional)
        </label>
        <Input
          id="contact-empresa"
          name="empresa"
          placeholder="Tu organización"
          autoComplete="organization"
          disabled={isSubmitting}
          maxLength={200}
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="contact-interes" className="text-sm font-medium text-foreground">
          ¿Sobre qué querés consultar? *
        </label>
        <select
          id="contact-interes"
          name="interes"
          value={interest}
          onChange={(event) => setInterest(event.target.value)}
          disabled={isSubmitting}
          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
        >
          {contactInterests.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className="space-y-2">
        <label htmlFor="contact-mensaje" className="text-sm font-medium text-foreground">
          ¿Cómo podemos ayudarte? *
        </label>
        <Textarea
          id="contact-mensaje"
          name="mensaje"
          required
          placeholder="Contanos sobre tu infraestructura..."
          className="min-h-[100px] resize-y md:min-h-[110px]"
          disabled={isSubmitting}
          maxLength={5000}
        />
      </div>

      {status === "error" && (
        <div className="flex items-center gap-2 rounded-md bg-destructive/10 p-3 text-sm text-destructive">
          <AlertCircle className="h-4 w-4 shrink-0" aria-hidden />
          <p>{errorMessage}</p>
        </div>
      )}

      <Button
        type="submit"
        disabled={isSubmitting}
        className="h-12 w-full text-base font-semibold"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" aria-hidden />
            Enviando...
          </>
        ) : (
          "Enviar mensaje"
        )}
      </Button>
    </form>
  );
}
