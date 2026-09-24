import { NutritionItem } from '../types/inspection';

/**
 * Recalculates nutrition values proportionally based on selected portion size.
 * Formula: value_at_portion = (value_per_100g * selected_portion_g) / 100
 */
export function calculatePortionNutrition(items: NutritionItem[], portionG: number): NutritionItem[] {
  return items.map((item) => {
    const recalculated = Number(((item.per100g * portionG) / 100).toFixed(portionG < 10 ? 2 : 1));
    const rda = item.rdaPercent ? Number(((item.rdaPercent * portionG) / 20).toFixed(1)) : undefined;

    // Traffic light status evaluation based on configured nutritional thresholds
    let status = item.thresholdStatus;
    if (item.thresholdCategory === 'sugar') {
      status = recalculated > 10 ? 'red' : recalculated > 5 ? 'amber' : 'green';
    } else if (item.thresholdCategory === 'sodium') {
      status = recalculated > 400 ? 'red' : recalculated > 150 ? 'amber' : 'green';
    } else if (item.thresholdCategory === 'fat') {
      status = recalculated > 15 ? 'red' : recalculated > 6 ? 'amber' : 'green';
    }

    return {
      ...item,
      perServe: recalculated,
      rdaPercent: rda,
      thresholdStatus: status
    };
  });
}

export const HEALTH_DISCLAIMER = 'Health insights are informational and are not medical advice. Nutritional values are calculated from extracted package declarations and configured reference thresholds.';
