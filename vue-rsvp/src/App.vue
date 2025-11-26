<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import { useForm, Field } from "vee-validate";
import { formSchema } from "@/schemas";
import { toTypedSchema } from "@vee-validate/zod";

const DRAFT_KEY = "event_registration_draft";

const TICKET_PRICES: Record<string, number> = {
  general: 100,
  vip: 250,
  student: 50,
};

// TODO: Implement form validation using vee-validate and zod
const { handleSubmit, values, errors } = useForm({
  // validationSchema: yourSchema
  initialValues: {
    // Fill out initial form values here
  },
});

const submittedData = ref<any>(null);

const totalPrice = computed(() => {
  // TODO: Calculate the total event price in real-time
  // You can use the `values` object to access form field values
  return 0;
});

const onSubmit = handleSubmit((values) => {
  submittedData.value = {
    ...values,
    totalPrice: totalPrice.value,
  };
});
</script>

<template>
  <div class="container">
    <div class="form-wrapper">
      <h1>Event Registration</h1>

      <!-- TODO: Replace form fields with the <Field> tag to have the form dynamically validate -->

      <form v-if="!submittedData" @submit="onSubmit" class="registration-form">
        <div class="form-group">
          <label for="email">Email Address</label>
          <input type="email" />
          <span class="error-message">{{ "email error!" }}</span>
        </div>

        <div class="form-group">
          <label for="email">Confirm Email Address</label>
          <input type="email" />
          <span class="error-message">{{ "email confirmation error!" }}</span>
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" />
          <span class="error-message">{{ "password error!" }}</span>
          <small class="hint"
            >Must be at least 8 characters with uppercase, number, and special
            character</small
          >
        </div>

        <div class="form-group">
          <label>Phone Number</label>
          <input type="tel" placeholder="0861234567" />
          <span class="error-message">{{ "phone number error!" }}</span>
        </div>

        <div class="form-group">
          <label for="ticketType">Ticket Type</label>
          <!-- To use a select field with different field, refer to the veevalidate docs: -->
          <!-- https://vee-validate.logaretm.com/v4/api/field/ -->
          <select>
            <option value="general">General Admission - $100</option>
            <option value="vip">VIP - $250</option>
            <option value="student">Student - $50</option>
          </select>
        </div>

        <div class="form-group">
          <label>Number of Tickets</label>
          <input type="number" min="1" max="10" />
          <span class="error-message">{{
            "invalid number of tickets error!"
          }}</span>
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
          <button type="button" class="btn btn-secondary">Save Draft</button>
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
