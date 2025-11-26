<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import { useForm, useField } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

const DRAFT_KEY = "event_registration_draft";
const VALID_PROMO_CODES = ["EARLY2024", "STUDENT50"];

const TICKET_PRICES: Record<string, number> = {
  general: 100,
  vip: 250,
  student: 50,
};

const PROMO_DISCOUNTS: Record<string, number> = {
  EARLY2024: 0.15,
  STUDENT50: 0.5,
};

const validationSchema = toTypedSchema(
  z
    .object({
      email: z.string().email("Must be a valid email address"),
      emailConfirmation: z.string().email("Must be a valid email address"),
      password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(
          /[!@#$%^&*(),.?":{}|<>]/,
          "Password must contain at least one special character"
        ),
      phoneNumber: z
        .string()
        .regex(
          /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
          "Phone number must be in format: (123) 456-7890 or 123-456-7890"
        ),
      ticketType: z.enum(["general", "vip", "student"]),
      dietaryRestrictions: z.array(z.string()),
      dietaryOther: z.string().optional(),
      promoCode: z.string().optional(),
    })
    .refine((data) => data.email === data.emailConfirmation, {
      message: "Emails must match",
      path: ["emailConfirmation"],
    })
);

const { handleSubmit, values, setValues, resetForm } = useForm({
  validationSchema,
  initialValues: {
    email: "",
    emailConfirmation: "",
    password: "",
    phoneNumber: "",
    ticketType: "general",
    dietaryRestrictions: [],
    dietaryOther: "",
    promoCode: "",
  },
});

const { value: email, errorMessage: emailError } = useField<string>("email");
const { value: emailConfirmation, errorMessage: emailConfirmationError } =
  useField<string>("emailConfirmation");
const { value: password, errorMessage: passwordError } =
  useField<string>("password");
const { value: phoneNumber, errorMessage: phoneNumberError } =
  useField<string>("phoneNumber");
const { value: ticketType } = useField<string>("ticketType");
const { value: dietaryRestrictions } = useField<string[]>(
  "dietaryRestrictions"
);
const { value: dietaryOther, errorMessage: dietaryOtherError } =
  useField<string>("dietaryOther");
const { value: promoCode, errorMessage: promoCodeError } =
  useField<string>("promoCode");

const showDietaryOther = computed(() =>
  dietaryRestrictions.value.includes("other")
);
const promoCodeMessage = ref("");
const submittedData = ref<any>(null);

const totalPrice = computed(() => {
  let basePrice = TICKET_PRICES[ticketType.value] || 0;

  if (
    promoCode.value &&
    VALID_PROMO_CODES.includes(promoCode.value.toUpperCase())
  ) {
    const discount = PROMO_DISCOUNTS[promoCode.value.toUpperCase()] || 0;
    basePrice = basePrice * (1 - discount);
  }

  return basePrice;
});

watch(promoCode, (newCode) => {
  if (!newCode) {
    promoCodeMessage.value = "";
    return;
  }

  const upperCode = newCode.toUpperCase();
  if (VALID_PROMO_CODES.includes(upperCode)) {
    const discount = PROMO_DISCOUNTS[upperCode] || 0;
    promoCodeMessage.value = `Valid promo code! ${(discount * 100).toFixed(
      0
    )}% discount applied`;
  } else {
    promoCodeMessage.value = "Invalid promo code";
  }
});

const saveDraft = () => {
  localStorage.setItem(DRAFT_KEY, JSON.stringify(values));
  alert("Draft saved successfully!");
};

const loadDraft = () => {
  const draft = localStorage.getItem(DRAFT_KEY);
  if (draft) {
    try {
      const parsedDraft = JSON.parse(draft);
      setValues(parsedDraft);
      alert("Draft loaded successfully!");
    } catch (e) {
      console.error("Error loading draft:", e);
    }
  }
};

const clearDraft = () => {
  localStorage.removeItem(DRAFT_KEY);
  resetForm();
  submittedData.value = null;
  alert("Draft cleared!");
};

const onSubmit = handleSubmit((values) => {
  submittedData.value = {
    ...values,
    totalPrice: totalPrice.value,
  };
  localStorage.removeItem(DRAFT_KEY);
  console.log("Form submitted:", submittedData.value);
});

onMounted(() => {
  const draft = localStorage.getItem(DRAFT_KEY);
  if (draft) {
    const shouldLoad = confirm("A draft was found. Would you like to load it?");
    if (shouldLoad) {
      loadDraft();
    }
  }
});
</script>

<template>
  <div class="container">
    <div class="form-wrapper">
      <h1>Event Registration</h1>

      <div v-if="submittedData" class="success-message">
        <h2>Registration Successful!</h2>
        <p>
          Thank you for registering. Your total is: ${{
            submittedData.totalPrice.toFixed(2)
          }}
        </p>
        <button @click="submittedData = null" class="btn btn-secondary">
          Register Another
        </button>
      </div>

      <form v-else @submit="onSubmit" class="registration-form">
        <div class="form-group">
          <label for="email">Email Address</label>
          <input
            id="email"
            v-model="email"
            type="email"
            :class="{ error: emailError }"
          />
          <span v-if="emailError" class="error-message">{{ emailError }}</span>
        </div>

        <div class="form-group">
          <label for="emailConfirmation">Confirm Email Address</label>
          <input
            id="emailConfirmation"
            v-model="emailConfirmation"
            type="email"
            :class="{ error: emailConfirmationError }"
          />
          <span v-if="emailConfirmationError" class="error-message">{{
            emailConfirmationError
          }}</span>
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input
            id="password"
            v-model="password"
            type="password"
            :class="{ error: passwordError }"
          />
          <span v-if="passwordError" class="error-message">{{
            passwordError
          }}</span>
          <small class="hint"
            >Must be at least 8 characters with uppercase, number, and special
            character</small
          >
        </div>

        <div class="form-group">
          <label for="phoneNumber">Phone Number</label>
          <input
            id="phoneNumber"
            v-model="phoneNumber"
            type="tel"
            placeholder="(123) 456-7890"
            :class="{ error: phoneNumberError }"
          />
          <span v-if="phoneNumberError" class="error-message">{{
            phoneNumberError
          }}</span>
        </div>

        <div class="form-group">
          <label for="ticketType">Ticket Type</label>
          <select id="ticketType" v-model="ticketType">
            <option value="general">General Admission - $100</option>
            <option value="vip">VIP - $250</option>
            <option value="student">Student - $50</option>
          </select>
        </div>

        <div class="form-group">
          <label>Dietary Restrictions</label>
          <div class="checkbox-group">
            <label class="checkbox-label">
              <input
                type="checkbox"
                value="vegetarian"
                v-model="dietaryRestrictions"
              />
              Vegetarian
            </label>
            <label class="checkbox-label">
              <input
                type="checkbox"
                value="vegan"
                v-model="dietaryRestrictions"
              />
              Vegan
            </label>
            <label class="checkbox-label">
              <input
                type="checkbox"
                value="gluten-free"
                v-model="dietaryRestrictions"
              />
              Gluten-Free
            </label>
            <label class="checkbox-label">
              <input
                type="checkbox"
                value="nut-allergy"
                v-model="dietaryRestrictions"
              />
              Nut Allergy
            </label>
            <label class="checkbox-label">
              <input
                type="checkbox"
                value="other"
                v-model="dietaryRestrictions"
              />
              Other
            </label>
          </div>
        </div>

        <div v-if="showDietaryOther" class="form-group">
          <label for="dietaryOther"
            >Please Specify Other Dietary Restrictions</label
          >
          <input
            id="dietaryOther"
            v-model="dietaryOther"
            type="text"
            :class="{ error: dietaryOtherError }"
          />
          <span v-if="dietaryOtherError" class="error-message">{{
            dietaryOtherError
          }}</span>
        </div>

        <div class="form-group">
          <label for="promoCode">Promo Code (Optional)</label>
          <input
            id="promoCode"
            v-model="promoCode"
            type="text"
            placeholder="Enter promo code"
            :class="{ error: promoCodeError }"
          />
          <span
            v-if="promoCodeMessage"
            :class="[
              'promo-message',
              VALID_PROMO_CODES.includes(promoCode.toUpperCase())
                ? 'success'
                : 'error',
            ]"
          >
            {{ promoCodeMessage }}
          </span>
        </div>

        <div class="price-display">
          <h3>Total Price: ${{ totalPrice.toFixed(2) }}</h3>
        </div>

        <div class="button-group">
          <button type="submit" class="btn btn-primary">
            Submit Registration
          </button>
          <button type="button" @click="saveDraft" class="btn btn-secondary">
            Save Draft
          </button>
          <button type="button" @click="clearDraft" class="btn btn-tertiary">
            Clear Form
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
