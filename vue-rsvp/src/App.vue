<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import { useForm, Field } from "vee-validate";
import { formSchema } from "@/schemas";
import { toTypedSchema } from "@vee-validate/zod";

const DRAFT_KEY = "event_registration_draft";
const VALID_PROMO_CODES = ["EARLY2024", "STUDENT50"];

const TICKET_PRICES: Record<string, number> = {
  general: 100,
  vip: 250,
  student: 50,
};

const validationSchema = toTypedSchema(formSchema);

const { handleSubmit, values, setValues, errors } = useForm({
  validationSchema,
  initialValues: {
    email: "",
    emailConfirmation: "",
    password: "",
    phoneNumber: "",
    ticketType: "general",
    numberOfTickets: 1,
    dietaryRestrictions: [],
    promoCode: "",
  },
});

const submittedData = ref<any>(null);

const totalPrice = computed(() => {
  if (values.numberOfTickets && values.ticketType) {
    return (TICKET_PRICES[values.ticketType] || 0) * values.numberOfTickets;
  }

  return 0;
});

const saveDraft = () => {
  localStorage.setItem(DRAFT_KEY, JSON.stringify(values));
  alert("Draft saved successfully!");
};

const loadDraft = () => {
  const draft = localStorage.getItem(DRAFT_KEY);
  if (draft) {
    const parsedDraft = JSON.parse(draft);
    setValues(parsedDraft);
  }
};

const onSubmit = handleSubmit((values) => {
  submittedData.value = {
    ...values,
    totalPrice: totalPrice.value,
  };
});

onMounted(() => {
  const draft = localStorage.getItem(DRAFT_KEY);
  if (draft) {
    loadDraft();
  }
});
</script>

<template>
  <div class="container">
    <div class="form-wrapper">
      <h1>Event Registration</h1>

      <form v-if="!submittedData" @submit="onSubmit" class="registration-form">
        <div class="form-group">
          <label for="email">Email Address</label>
          <Field type="email" name="email" :class="{ error: errors.email }" />
          <span class="error-message">{{ errors.email }}</span>
        </div>

        <div class="form-group">
          <label for="email">Confirm Email Address</label>
          <Field
            type="email"
            name="emailConfirmation"
            :class="{ error: errors.emailConfirmation }"
          />
          <span class="error-message">{{ errors.emailConfirmation }}</span>
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <Field
            type="password"
            name="password"
            :class="{ error: errors.password }"
          />
          <span class="error-message">{{ errors.password }}</span>
          <small class="hint"
            >Must be at least 8 characters with uppercase, number, and special
            character</small
          >
        </div>

        <div class="form-group">
          <label for="phoneNumber">Phone Number</label>
          <Field
            type="tel"
            name="phoneNumber"
            placeholder="0861234567"
            :class="{ error: errors.phoneNumber }"
          />
          <span class="error-message">{{ errors.phoneNumber }}</span>
        </div>

        <div class="form-group">
          <label for="ticketType">Ticket Type</label>
          <!-- https://vee-validate.logaretm.com/v4/api/field/ -->
          <Field name="ticketType" as="select">
            <option value="general">General Admission - $100</option>
            <option value="vip">VIP - $250</option>
            <option value="student">Student - $50</option>
          </Field>
        </div>

        <div class="form-group">
          <label for="numberOfTickets">Number of Tickets</label>
          <Field
            type="number"
            name="numberOfTickets"
            min="1"
            max="10"
            :class="{ error: errors.numberOfTickets }"
          />
          <span class="error-message">{{ errors.numberOfTickets }}</span>
        </div>

        <!-- https://vee-validate.logaretm.com/v4/examples/checkboxes-and-radio/ -->
        <div class="form-group">
          <label>Dietary Requirements</label>
          <div class="checkbox-group">
            <label
              ><Field
                type="checkbox"
                value="vegetarian"
                name="dietaryRestrictions"
              />Vegetarian</label
            >
            <label
              ><Field
                type="checkbox"
                value="vegan"
                name="dietaryRestrictions"
              />Vegan</label
            >
            <label
              ><Field
                type="checkbox"
                value="nut-allergy"
                name="dietaryRestrictions"
              />Nut Allergy</label
            >
            <label
              ><Field
                type="checkbox"
                value="gluten-free"
                name="dietaryRestrictions"
              />Gluten Free</label
            >
          </div>
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
        </div>
      </form>

      <div v-else class="success-message">
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
    </div>
  </div>
</template>
