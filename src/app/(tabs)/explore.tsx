import { Feather } from '@expo/vector-icons';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Alert,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useTheme } from '../ThemeContext';

const { width } = Dimensions.get('window');

export default function Explore() {
  const { theme, isDarkMode } = useTheme();
  const { t } = useTranslation();

  const handleActionPress = (title: string) => {
    Alert.alert(
      t("exploreAlertTitle"),
      t("exploreAlertMessage", { title })
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        {/* HEADER */}
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: theme.text }]}>
            {t("explore")}
          </Text>
          <Text style={[styles.headerSub, { color: theme.subText }]}>
            {t("exploreSubtitle")}
          </Text>
        </View>

        {/* CHARGING */}
        <Text style={[styles.sectionTitle, { color: theme.subText }]}>
          {t("chargingStations")}
        </Text>

        <TouchableOpacity
          style={[styles.mainCard, { backgroundColor: theme.cardBackground }]}
          onPress={() => handleActionPress('Supercharger Haritası')}
        >
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1593941707882-a5bba53e4e27' }}
            style={styles.cardImage}
          />

          <View style={styles.cardOverlay}>
            <View style={styles.badge}>
              <Feather name="zap" size={12} color="#FFF" />
              <Text style={styles.badgeText}>
                {t("fastCharge")}
              </Text>
            </View>

            <Text style={styles.cardTitle}>
              {t("supercharger")}
            </Text>

            <Text style={styles.cardSub}>
              {t("superchargerDesc")}
            </Text>
          </View>
        </TouchableOpacity>

        {/* SOFTWARE */}
        <Text style={[styles.sectionTitle, { color: theme.subText }]}>
          {t("softwareUpdates")}
        </Text>

        <View style={styles.gridContainer}>

          <TouchableOpacity
            style={[styles.gridCard, { backgroundColor: theme.cardBackground }]}
            onPress={() => handleActionPress('Full Self Driving')}
          >
            <View style={[styles.iconWrapper, { backgroundColor: '#1A73E8' }]}>
              <Feather name="navigation" size={20} color="#FFF" />
            </View>

            <Text style={[styles.gridTitle, { color: theme.text }]}>
              {t("fsd")}
            </Text>

            <Text style={[styles.gridDesc, { color: theme.subText }]}>
              {t("fsdDesc")}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.gridCard, { backgroundColor: theme.cardBackground }]}
            onPress={() => handleActionPress('Rear Heating')}
          >
            <View style={[styles.iconWrapper, { backgroundColor: '#E2583E' }]}>
              <Feather name="thermometer" size={20} color="#FFF" />
            </View>

            <Text style={[styles.gridTitle, { color: theme.text }]}>
              {t("rearHeating")}
            </Text>

            <Text style={[styles.gridDesc, { color: theme.subText }]}>
              {t("rearHeatingDesc")}
            </Text>
          </TouchableOpacity>

        </View>

        {/* PROGRAMS */}
        <Text style={[styles.sectionTitle, { color: theme.subText }]}>
          {t("programs")}
        </Text>

        <TouchableOpacity
          style={[styles.rowCard, { backgroundColor: theme.cardBackground }]}
          onPress={() => handleActionPress('Invite Friend')}
        >
          <View style={[styles.rowIconWrapper, { backgroundColor: '#FBBC04' }]}>
            <Feather name="gift" size={22} color="#FFF" />
          </View>

          <View style={styles.rowTextWrapper}>
            <Text style={[styles.rowTitle, { color: theme.text }]}>
              {t("inviteFriend")}
            </Text>
            <Text style={[styles.rowDesc, { color: theme.subText }]}>
              {t("inviteFriendDesc")}
            </Text>
          </View>

          <Feather name="chevron-right" size={20} color={theme.subText} />
        </TouchableOpacity>

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
    fontWeight: '800',
  },
  headerSub: {
    fontSize: 14,
    marginTop: 4,
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginLeft: 24,
    marginTop: 28,
    marginBottom: 12,
  },
  mainCard: {
    marginHorizontal: 16,
    borderRadius: 24,
    height: 180,
    overflow: 'hidden',
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    opacity: 0.9,
  },
  cardOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#34C759',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  badgeText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '700',
    marginLeft: 4,
  },
  cardTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '700',
  },
  cardSub: {
    color: '#E5E5EA',
    fontSize: 13,
    marginTop: 4,
  },
  gridContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  gridCard: {
    width: (width - 44) / 2,
    borderRadius: 20,
    padding: 16,
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  gridTitle: {
    fontSize: 15,
    fontWeight: '700',
  },
  gridDesc: {
    fontSize: 12,
    marginTop: 4,
  },
  rowCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 20,
  },
  rowIconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  rowTextWrapper: {
    flex: 1,
  },
  rowTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  rowDesc: {
    fontSize: 13,
    marginTop: 2,
  },
});