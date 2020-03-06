# React Budget Calculator Exercise


### Brief Summary
Budget Calculator was designed with a landscape architecture project in mind.  Part of the design process of such projects involves a calibration between the customer's budget and the cost of the chosen design.  This app takes in a customer's budget, provides a set of design elements (such as ground covering or water feature) and their associates cost estimates, and calculates the total estimated cost of the selected design elements.  A gravel ground covering has a cost; a water feature has a cost; when these two costs are summed, the total cost may exceed the customer's budget.  The tool thus allows a customer to add or subtract elements until some combination meets the budget.

### Key Specifications
1. The application querys the user for a budget for the project.
2. The application correctly pulls design elements and their associate cost estimates from the firebase firestore collection "items".
3. The application displays items in a checklist grouped by "type" (see item interface below).
4. Each "type" section should allow __one__ or __none__ of the items of that type to be selected/checked at a time.
5. Every item has a lowPrice and a highPrice. This should be used to calculate and display a price range somewhere on the screen.
6. The application should give the user feedback depending on how well the items they have selected fit into their budget, ie: letting the user know if their budget falls below the minimum bounds of the estimate, if their budget is above the upper bound, etc.
7.  The client should be able to submit the checklist. Store this information however you like in firestore, but DO NOT modify the items collection.

### Comments on Data and Data Structures

- the _items_ look like this:

```typescript
interface Item {
  type: string;
  name: string;
  lowPrice: number;
  highPrice: number;
}
```

- The _lowPrice_ and _highPrice_ properties are integers representing United States Currency, the last two digits of each number are cents. This means that `60000` is equal to \$600.00. It is expected that you will display the currency on screen in a common human-readable format.

- Each _type_ string is an uppercase string separated by underscores. You should transform these properties to display category names with proper english grammer. ie WATER_FEATURES should become Water Features.

### What we would like to see

- Excellent UI design.
- An understanding of react in general.
- Use of modular components.
- Functional components that utilize hooks.
- Code comments explaining your thought process.
- state management with react built in functionality only (no redux).
