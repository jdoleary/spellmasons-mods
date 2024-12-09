export declare const testLevelSave: {
    version: string;
    underworld: {
        seed: string;
        localUnderworldNumber: number;
        levelIndex: number;
        isTutorialRun: boolean;
        wave: number;
        RNGState: {
            i: number;
            j: number;
            S: number[];
        };
        turn_phase: number;
        subTypesTurnOrder: number[][];
        lastUnitId: number;
        lastPickupId: number;
        turn_number: number;
        hasSpawnedBoss: boolean;
        limits: {
            xMin: number;
            xMax: number;
            yMin: number;
            yMax: number;
        };
        imageOnlyTiles: {
            image: string;
            x: number;
            y: number;
        }[];
        liquidBounds: {
            p1: {
                x: number;
                y: number;
            };
            p2: {
                x: number;
                y: number;
            };
        }[];
        liquidPolygons: {
            x: number;
            y: number;
        }[][];
        pathingLineSegments: {
            p1: {
                x: number;
                y: number;
            };
            p2: {
                x: number;
                y: number;
            };
            polygon: {
                x: number;
                y: number;
            }[];
        }[];
        processedMessageCount: number;
        cardDropsDropped: number;
        enemiesKilled: number;
        forceMovePrediction: never[];
        timeSinceLastSimulationStep: number;
        lastThoughtsHash: string;
        playerThoughts: {};
        lastLevelCreated: {
            levelIndex: number;
            biome: string;
            limits: {
                xMin: number;
                xMax: number;
                yMin: number;
                yMax: number;
            };
            liquid: {
                image: string;
                x: number;
                y: number;
            }[];
            obstacles: {
                x: number;
                y: number;
                material: number;
                bounds: {
                    x: number;
                    y: number;
                }[];
            }[];
            imageOnlyTiles: {
                image: string;
                x: number;
                y: number;
            }[];
            width: number;
            pickups: {
                index: number;
                coord: {
                    image: string;
                    x: number;
                    y: number;
                };
            }[];
            enemies: {
                id: string;
                coord: {
                    image: string;
                    x: number;
                    y: number;
                };
                isMiniboss: boolean;
            }[];
        };
        allowForceInitGameState: boolean;
        bloods: never[];
        activeMods: string[];
        generatingLevel: boolean;
        simulatingMovePredictions: boolean;
        allyNPCAttemptWinKillSwitch: number;
        aquirePickupQueue: never[];
        startTime: number;
        headlessTimeouts: never[];
        forceMove: never[];
        players: {
            statPointsUnspent: number;
            name: string;
            endedTurn: boolean;
            clientId: string;
            playerId: string;
            clientConnected: boolean;
            color: number;
            colorMagic: number;
            awaitingSpawn: boolean;
            isSpawned: boolean;
            cardsInToolbar: string[];
            inventory: string[];
            freeSpells: never[];
            cardUsageCounts: {};
            upgrades: string[];
            upgradesLeftToChoose: number;
            lobbyReady: boolean;
            reroll: number;
            spellState: {};
            cursesChosen: number;
            stats: {
                bestSpell: {
                    unitsKilled: number;
                    spell: never[];
                };
                longestSpell: never[];
                gameStartTime: number;
                totalKills: number;
            };
            unit: {
                id: number;
            };
        }[];
        units: {
            type: string;
            id: number;
            unitSourceId: string;
            x: number;
            y: number;
            originalLife: boolean;
            radius: number;
            moveSpeed: number;
            stamina: number;
            staminaMax: number;
            attackRange: number;
            isMiniboss: boolean;
            faction: number;
            image: {
                sprite: {
                    x: number;
                    y: number;
                    scale: {
                        x: number;
                        y: number;
                    };
                    imagePath: string;
                    loop: boolean;
                    children: never[];
                };
            };
            defaultImagePath: string;
            shaderUniforms: {
                all_red: {
                    alpha: number;
                };
            };
            damage: number;
            strength: number;
            bloodColor: number;
            health: number;
            healthMax: number;
            mana: number;
            manaMax: number;
            manaCostToCast: number;
            manaPerTurn: number;
            alive: boolean;
            immovable: boolean;
            unitType: number;
            unitSubType: number;
            modifiers: {};
            inLiquid: boolean;
            UITargetCircleOffsetY: number;
            beingPushed: boolean;
            predictedNextTurnDamage: number;
            name: string;
            onDealDamageEvents: never[];
            onTakeDamageEvents: never[];
            onDeathEvents: never[];
            onAgroEvents: never[];
            onTurnStartEvents: never[];
            onTurnEndEvents: never[];
            onDrawSelectedEvents: never[];
        }[];
        pickups: never[];
    };
    phase: number;
    pickups: never[];
    units: {
        type: string;
        id: number;
        unitSourceId: string;
        x: number;
        y: number;
        originalLife: boolean;
        radius: number;
        moveSpeed: number;
        stamina: number;
        staminaMax: number;
        attackRange: number;
        isMiniboss: boolean;
        faction: number;
        image: {
            sprite: {
                x: number;
                y: number;
                scale: {
                    x: number;
                    y: number;
                };
                imagePath: string;
                loop: boolean;
                children: never[];
            };
        };
        defaultImagePath: string;
        shaderUniforms: {
            all_red: {
                alpha: number;
            };
        };
        damage: number;
        strength: number;
        bloodColor: number;
        health: number;
        healthMax: number;
        mana: number;
        manaMax: number;
        manaCostToCast: number;
        manaPerTurn: number;
        alive: boolean;
        immovable: boolean;
        unitType: number;
        unitSubType: number;
        modifiers: {};
        inLiquid: boolean;
        UITargetCircleOffsetY: number;
        beingPushed: boolean;
        predictedNextTurnDamage: number;
        name: string;
        onDealDamageEvents: never[];
        onTakeDamageEvents: never[];
        onDeathEvents: never[];
        onAgroEvents: never[];
        onTurnStartEvents: never[];
        onTurnEndEvents: never[];
        onDrawSelectedEvents: never[];
    }[];
    players: {
        statPointsUnspent: number;
        name: string;
        endedTurn: boolean;
        clientId: string;
        playerId: string;
        clientConnected: boolean;
        color: number;
        colorMagic: number;
        awaitingSpawn: boolean;
        isSpawned: boolean;
        cardsInToolbar: string[];
        inventory: string[];
        freeSpells: never[];
        cardUsageCounts: {};
        upgrades: string[];
        upgradesLeftToChoose: number;
        lobbyReady: boolean;
        reroll: number;
        spellState: {};
        cursesChosen: number;
        stats: {
            bestSpell: {
                unitsKilled: number;
                spell: never[];
            };
            longestSpell: never[];
            gameStartTime: number;
            totalKills: number;
        };
        unit: {
            id: number;
        };
    }[];
    numberOfHotseatPlayers: number;
};
