import { View, StyleSheet } from "react-native";
import React, { useState } from "react";
import DropDown from "./DropDown";
import Input from "./Input";
import PlantSearch from "./PlantSearch";
import { useGardensAndPlants } from "@/context/GardensAndPlantsContext";
import { AddUserPlant, CatalogPlant } from "@/types/models";
import { useAuth } from "@/context/AuthContext";
import Button from "@/components/Button";
import colors from "@/constants/colors";

interface AddPlantOptionProps {
  plantChosen: boolean;
  togglePlantMenu: () => void;
  setPlantChosen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddPlantOption: React.FC<AddPlantOptionProps> = ({
  plantChosen,
  togglePlantMenu,
  setPlantChosen,
}) => {
  const { gardens, createPlant } = useGardensAndPlants();

  const [nickName, setNickName] = useState<string>("");
  const [selectedGarden, setSelectedGarden] = useState<string>("");
  const [selectedPlant, setSelectedPlant] = useState<CatalogPlant | null>(null);

  const handlePlantSelection = (plant: CatalogPlant) => setSelectedPlant(plant);
  const handleNickNameChange = (text: string) => setNickName(text);
  const handleGardenSelect = (gardenId: string) => setSelectedGarden(gardenId);

  const isAddPlantDisabled = !nickName || !selectedGarden || !selectedPlant;

  const gardenOptions = gardens.map((garden) => ({
    value: garden.id,
    label: garden.name,
  }));

  const { user } = useAuth();

  const handleAddPlant = () => {
    if (!selectedPlant || !selectedGarden || !nickName) return;

    const addPlant: AddUserPlant = {
      nickName,
      garden_id: selectedGarden,
      catalogPlant_id: selectedPlant.id || "",
      userId: user?.id || -1,
      name: selectedPlant.name,
      blooming: selectedPlant.blooming,
      waterFrequency: selectedPlant.waterFrequency,
      harvest: selectedPlant.harvest,
      sunLight: selectedPlant.sunLight,
      temperature: selectedPlant.temperature,
      size: selectedPlant.size,
      fertilizerType: selectedPlant.fertilizerType,
      planting: selectedPlant.planting,
      wateredDate: "",
      plantedDate: "",
      feededDate: "",
      moistureLevel: "Optimal",
      sunlightLevel: "Optimal",
      harvested: false,
    };

    // Call the createPlant function to save to the database
    createPlant(addPlant);

    // Reset state after adding
    setPlantChosen(false);
    setNickName("");
    setSelectedGarden("");
    setSelectedPlant(null);
  };

  return (
    <View style={[styles.menuOption, { gap: 8 }]}>
      <PlantSearch onSelectPlant={handlePlantSelection} />
      <Input
        label="Nickname"
        placeholder="Nickname..."
        iconName="flower"
        value={nickName}
        onChangeText={handleNickNameChange}
      />
      <DropDown
        label="Select a Garden"
        placeholder="Choose a garden..."
        options={gardenOptions}
        onSelect={handleGardenSelect}
      />
      <Button
        text="Add plant"
        type="primary"
        iconName="plus"
        onPress={handleAddPlant}
        buttonState={isAddPlantDisabled ? "disabled" : "default"}
      />
    </View>
  );
};

export default AddPlantOption;

const styles = StyleSheet.create({
  menuContainer: {
    flexDirection: "column",
    gap: 8,
    backgroundColor: "#fff",
    borderRadius: 8,
    position: "absolute",
    bottom: 70,
    width: "95%",
    margin: "2.5%",
    paddingBottom: 16,
  },
  optionContainer: {
    flexDirection: "column",
    gap: 8,
    padding: 8,
  },
  menuOption: {
    padding: 8,
    fontSize: 18,
    color: colors.textPrimary,
  },
});