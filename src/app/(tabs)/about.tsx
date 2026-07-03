import { Feather } from '@expo/vector-icons';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useTheme } from '../ThemeContext';

export default function About() {
  const { theme, isDarkMode } = useTheme();
  const { t } = useTranslation();

  const handleLinkPress = () => {
    Alert.alert(t("comingSoon"));
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: theme.text }]}>
            {t("about")}
          </Text>
        </View>

        <View style={styles.brandSection}>
          <View
            style={[
              styles.logoContainer,
              { backgroundColor: theme.cardBackground },
            ]}
          >
            <Image
              source={require("../../assets/images/carrental.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          <Text style={[styles.appName, { color: theme.text }]}>
            {t("appName")}
          </Text>

          <Text style={[styles.appVersion, { color: theme.subText }]}>
            {t("version")} 1.0.0
          </Text>
        </View>

        <View
          style={[
            styles.card,
            { backgroundColor: theme.cardBackground },
          ]}
        >
          <Text
            style={[
              styles.cardDescription,
              { color: theme.text },
            ]}
          >
            {t("aboutDescription")}
          </Text>
        </View>

        <View
          style={[
            styles.card,
            { backgroundColor: theme.cardBackground },
          ]}
        >
          <TouchableOpacity
            style={[
              styles.row,
              { borderBottomColor: theme.borderColor },
            ]}
            onPress={handleLinkPress}
          >
            <View
              style={[
                styles.iconContainer,
                {
                  backgroundColor: isDarkMode
                    ? "#2C2C2E"
                    : "#F1F3F4",
                },
              ]}
            >
              <Feather
                name="file-text"
                size={18}
                color={theme.text}
              />
            </View>

            <Text
              style={[
                styles.rowLabel,
                { color: theme.text },
              ]}
            >
              {t("terms")}
            </Text>

            <Feather
              name="external-link"
              size={16}
              color={theme.subText}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.row,
              { borderBottomColor: theme.borderColor },
            ]}
            onPress={handleLinkPress}
          >
            <View
              style={[
                styles.iconContainer,
                {
                  backgroundColor: isDarkMode
                    ? "#2C2C2E"
                    : "#F1F3F4",
                },
              ]}
            >
              <Feather
                name="shield"
                size={18}
                color={theme.text}
              />
            </View>

            <Text
              style={[
                styles.rowLabel,
                { color: theme.text },
              ]}
            >
              {t("privacy")}
            </Text>

            <Feather
              name="external-link"
              size={16}
              color={theme.subText}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.row}
            onPress={handleLinkPress}
          >
            <View
              style={[
                styles.iconContainer,
                {
                  backgroundColor: isDarkMode
                    ? "#2C2C2E"
                    : "#F1F3F4",
                },
              ]}
            >
              <Feather
                name="globe"
                size={18}
                color={theme.text}
              />
            </View>

            <Text
              style={[
                styles.rowLabel,
                { color: theme.text },
              ]}
            >
              {t("website")}
            </Text>

            <Feather
              name="external-link"
              size={16}
              color={theme.subText}
            />
          </TouchableOpacity>
        </View>

        <Text
          style={[
            styles.footerText,
            { color: theme.subText },
          ]}
        >
          {t("copyright")}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
  },
  brandSection: {
    alignItems: "center",
    marginVertical: 32,
  },
  logoContainer: {
    width: 110,
    height: 110,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 20,
  },
  appName: {
    fontSize: 22,
    fontWeight: "700",
    marginTop: 16,
  },
  appVersion: {
    fontSize: 14,
    marginTop: 6,
  },
  card: {
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 20,
    paddingHorizontal: 16,
    paddingVertical: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardDescription: {
    fontSize: 15,
    lineHeight: 22,
    paddingVertical: 14,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  rowLabel: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
  },
  footerText: {
    fontSize: 13,
    textAlign: "center",
    marginTop: 20,
  },
});