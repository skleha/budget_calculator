# Budget Calculator Exercise


## Brief Summary
Budget Calculator was designed with a landscape architecture firm in mind.  Part of the design process involves a calibration between the customer's budget and the cost of the chose design.  This app takes in a budget, provides a set broad design elements (such as ground covering or water feature), and calculates the estimated cost of the selected elements.  A gravel ground covering has a cost; a water feature has a cost; when these two costs are combined, the total cost may exceed the customer's budget.  The tool thus allows a customer to add or subtract elements until some combination meets the budget.

## Key Specifications
1. Start the user experience by asking the client to enter a budget for their project.
2. Query budget checklist items from the firebase firestore collection "items".
3. Display items in a checklist grouped by type (see item interface below). Each section should allow one or none of the items of that type to be selected/checked at a time.
4. Every item has a lowPrice and a highPrice. This should be used to calculate and display a price range somewhere on the screen.
5. The application should give the user feedback depending on how well the items they have selected fit into their budget, ie: letting the user know if their budget falls below the minimum bounds of the estimate, if their budget is above the upper bound, etc.
6.  The client should be able to submit the checklist. Store this information however you like in firestore, but DO NOT modify the items collection.

## Tips

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

## What we would like to see

- Excellent UI design.
- An understanding of react in general.
- Use of modular components.
- Functional components that utilize hooks.
- Code comments explaining your thought process.
- state management with react built in functionality only (no redux).
